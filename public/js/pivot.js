(function () {


    /*
    var data = [];
    for (var i = 0; i < 100; i++) {
        data.push({ author: "Adam Smith", titleColor: "rgba(212, 14, 136, 1)", title: "Missed conversation with Michael Brown", previewText: "Michael Brown [1:53 PM]: Thanks for taking the time...", time: "1:55p" });
        data.push({ author: "Michael Brown", titleColor: "rgba(212, 14, 136, 1)", title: "Need help later", previewText: "I was hoping you could help me with...", time: "1:50p" });
        data.push({ author: "Thomas Lee", titleColor: "rgba(212, 14, 136, 1)", title: "Lunch with you", previewText: "Any chance you want to do lunch on...", time: "1:20p" });
        data.push({ author: "Michael Wilson", titleColor: "rgba(212, 14, 136, 1)", title: "QuickStart's and How To's", previewText: "More information on how to use WinJS controls", time: "1:17p" });
        data.push({ author: "Gary Paul", titleColor: "rgba(212, 14, 136, 1)", title: "Going out saturday", previewText: "Jean and I are leaving...", time: "12:28p" });
        data.push({ author: "Smith Jones", titleColor: "rgba(212, 14, 136, 1)", title: "Happend every time", previewText: "I always end up going to the ...", time: "7:12a" });
    }
    window.All = { dataSource: new WinJS.Binding.List(data).dataSource };
    */

    data = resources['Asia'];
    window.Asia = { dataSource: new WinJS.Binding.List(data).dataSource };

    data = resources['Europe'];
    window.Europe = { dataSource: new WinJS.Binding.List(data).dataSource };

    data = resources['North'];
    // data.push({ author: "Michael Wilson", titleColor: "rgba(212, 14, 136, 1)", title: "QuickStart's and How To's", previewText: "More information on how to use WinJS controls", time: "1:17p" });
    // data.push({ author: "Gary Paul", titleColor: "rgba(212, 14, 136, 1)", title: "Going out saturday", previewText: "Jean and I are leaving...", time: "12:28p" });
    // data.push({ author: "Smith Jones", titleColor: "rgba(212, 14, 136, 1)", title: "Happend every time", previewText: "I always end up going to the ...", time: "7:12a" });
    window.North = { dataSource: new WinJS.Binding.List(data).dataSource };
    


})();

// Config starter ...
// --------------------
currentItem=-1;
page=0; // index.html


WinJS.UI.processAll().then(function () {


    WinJS.Navigation.addEventListener("beforenavigate", function(e){
        if (boxopen) {
            e.detail.setPromise(WinJS.Promise.wrap(true));
            // spinn.stop();
        }
    });

   WinJS.Navigation.addEventListener("navigating", function (e) {

    var elem = document.getElementById("contentTarget");

    WinJS.Utilities.empty(elem);

    WinJS.UI.Pages.render(e.detail.location, elem)
    .then(function () {

        if (e.detail.location=="/list.html"){

            var local = e.detail.state;
            
            WinJS.Utilities.setInnerHTML(
                WinJS.Utilities.query("#appHeaderTitle")[0]
                , '<b>'+local+'</b>');


        }


        var enterPage = WinJS.UI.Animation.enterPage(elem.children);

        enterPage.done(
            function(){


                if (e.detail.location=="/index.html"){
                    page=0;
                    WinJS.Utilities.query(".listviewpivotitem")
                    .listen("iteminvoked", 
                        function(invoke){ 

                            getNews(invoke);

                        }, false);
                }

                if (e.detail.location=="/list.html"){


                    page=1; // list.html
                    WinJS.Utilities.query(".listviewpivotitem")
                    .listen(
                        "iteminvoked", 
                        function(invoke){ 

                                spinner.show();

                                    // console.log(invoke.detail.itemPromise._value.data)
                                    var clicked = invoke.detail.itemPromise._value.data;          

                                     WinJS.Utilities.query("a").forEach(function(itema){
                                        itema.addEventListener("click",
                                        function(e){

                                            e.returnValue =false;
                                            e.preventDefault();
                                            e.stopPropagation();

                                            window.open(this.href,'Guganews');
                                        });
                                     });

                                    //console.log(this);
                                    var index  = invoke.detail.itemIndex;

                                    currentItem=index;

                                    // window.location=clicked.link;
                                    // window.open(clicked.link, "_blank", "fullscreen=yes,height=600,width=800,scrollbars=yes,resizable=no");
                                    transitionBetweenContent(
                                        clicked
                                        ,function(){
                                                 var list=document.getElementById("pivotScenario3").winControl._currentItem._contentElement.firstElementChild.winControl;
                                                // console.log("Ensure visible");
                                                list.ensureVisible(index);
                                                spinner.stop();
                                            });

                                    

                                

                                }, false);
}

});

});

});

WinJS.Utilities.query(".listviewpivotitem")
.listen(
    "iteminvoked", 
    function(invoke){ 

        getNews(invoke);

    }, false
    ); 
});


currentCountryData=0;
function getNews(invoke,uselast,cb){

    var spinner = spin();
   // spinner.stop();

    console.log("Getting news!");
        // console.log(invoke.detail.itemPromise._value.data);
        // 
    /*
    h - specifies the top headlines topic
    w - specifies the world topic
    b - specifies the business topic
    n - specifies the nation topic
    t - specifies the science and technology topic
    el - specifies the elections topic
    p - specifies the politics topic
    e - specifies the entertainment topic
    s - specifies the sports topic
    m - specifies the health topic
    */
    var list=["h","w","b","n","t","el","p","e","s","m"];

    var url = uselast? currentCountryData.data.url : invoke.detail.itemPromise._value.data.url;
    var name  = uselast? currentCountryData.data.name : invoke.detail.itemPromise._value.data.name;

    var ned = url.substr(url.indexOf('=')+1);
    var hl = ned.substr(0,ned.indexOf('_'));

    currentCountryData = invoke ? invoke.detail.itemPromise._value : currentCountryData;
    currentCountryData.data.ned=ned;
    currentCountryData.data.hl=hl;
    // Content cache clear
    currentCountryData.content={};
    var requests = list.map(function(item){

        // console.log(item);

        var head= document.getElementsByTagName('head')[0];
        var script= document.createElement('script');
        var error= false;

        var topic = item;
        script.type= 'text/javascript';
        script.onerror = function(er){
            console.log(er);
            // spinner.stop();
            if (error) {

                return;
            }
            error=true;
            var contentDialog = document.querySelector(".win-contentdialog").winControl;
            contentDialog._dom.commands[0].addEventListener(
                'click'
                ,function(){
                    // spinner.stop();
                    return;
                });
            contentDialog.show();
            return;
        }

        var totalresults=20;
        script.src= "http://ajax.googleapis.com/ajax/services/feed/load?context="+topic+"&callback=processResults&num="+totalresults+"&v=1.0&q=https%3A%2F%2Fnews.google.com%2Fnews%2Ffeeds%3Fpz%3D1%26cf%3Dall%26num%3D"+totalresults+"%26ned%3D"+ned+"%26hl%3D"+hl+"%26topic%3D"+topic+"%26output%3Drss";
        //console.log(script.src);
        
        head.appendChild(script);
        if(item==='h') {
            script.onload=function(){
                WinJS.Navigation.navigate("/list.html",name).done(
                    function(){
                        // spinner.stop();
                        if (cb) cb();
                    }
                    );
            };
        }

    });
/*
    WinJS.Promise.join(requests).done(
        function(){
        //    console.log('Done requesting');
        //console.log(invoke.detail.itemPromise._value.data);

        }
    );
*/  
}

/****************************************************************
transitionBetweenContent
*/
var actout=0;
var actin=0;
var loaded={};

function transitionBetweenContent(clicked,cb) {

    // Check loaded state
    if (typeof currentCountryData.content[clicked.id]!=='undefined') {

        transitionBetweenContentToggle(clicked.id,clicked.id2,clicked.id3,clicked.id4,cb);

    } else {

        currentCountryData.content[clicked.id]=true;

        bindMediaImage(clicked.id2,clicked.id3,clicked.id4,
            function(){

                transitionBetweenContentToggle(clicked.id,clicked.id2,clicked.id3,clicked.id4,cb);
                
        });
            loadImageForItem(clicked,clicked.id3);
        loadVideoForItem(clicked,clicked.id4);

    }

    return;

}

function transitionBetweenContentToggle(id,id2,id3,id4,cb){

    var incoming;
    var outgoing;
    var output1=document.querySelectorAll('[name="'+id+'"]')[0];
    var output2=document.querySelectorAll('[name="'+id2+'"]')[0];


    // Assign incoming and outgoing
    if (output2.style.display === "none") {

        //window[id3] = new WinJS.Binding.List([]);
        //window[id4] = new WinJS.Binding.List([]);
                                    

        incoming = output2;
        outgoing = output1;
    } else {
        incoming = output1;
        outgoing = output2;
    }



    if (actin){
    if(actin==outgoing){

        WinJS.UI.executeTransition(actin,
        {
            property: "opacity",
            delay: 0,
            duration: 150,
            timing: "linear",
            from: 1,
            to: 0
        }).done(function(){

            actout.style.display = "block";
            actin.style.display = "none";

            WinJS.UI.executeTransition(actout,
                {
                    property: "opacity",
                    delay: 0,
                    duration: 250,
                    timing: "linear",
                    from: 0,
                    to: 1
                }).done(function(){});
        });
        cb();
        return;

    } else {
        actout.style.display = "block";
        actin.style.display = "none";
        actout.style.opacity = 1;
        actin.style.opacity = 0;
    }
    } 

                                        
    actout=outgoing;actin=incoming;
       
        //bindMediaVideo(id2,id3,id4);

    WinJS.UI.executeTransition(outgoing,
    {
        property: "opacity",
        delay: 0,
        duration: 0,
        timing: "linear",
        from: 1,
        to: 0
    }).done(function(){

        outgoing.style.display = "none";
        incoming.style.display = "block";

            

        WinJS.UI.executeTransition(
                incoming,
            {
                property: "opacity",
                delay: 0,
                duration: 250,
                timing: "linear",
                from: 0,
                to: 1
            }).done(function(){

                cb();

            });
    });

}

// Update engine ******************************
boxopen=0;
refreshtimeout=1000*60*30;
tor=0;
function updateBar(){
/* Button action
    var appBar = document.getElementById("createAppBar").winControl;
    appBar.getCommandById("cmdAdd").addEventListener("click", 
    function(){ getNews(false,true);  }, false);
*/
    var m=setTimeout(function(){window.location.reload();},5000);

    if (boxopen) {return;}
    boxopen=1;
    var cd = document.querySelector("#refresh");
    
    if (cd){
        var contentDialog = document.querySelector("#refresh").winControl;
    } else {  
        startupdate();
        return;
    }
    
    contentDialog.onafterhide = function(){

    };
    contentDialog._dom.commands[0].addEventListener(
        'click'
        ,function(){
            
            // if (page==0) {
                window.location.reload();
            /* }else if (page==1) {
                WinJS.Navigation.back().done(function(){
                    getNews(false,true,function(){ 
                        startupdate();
                     });
                    
                });
            }*/

            return;
        });
    contentDialog._dom.commands[1].addEventListener(
        'click'
        ,function(){
                clearTimeout(m);
                    startupdate();
            return;
        });

    contentDialog.show();
        boxopen=1;

}

function stopupdate(log){
    if (log) console.log("updating call:start",tor,refreshtimeout,boxopen);
    boxopen= 0;
    if (tor) clearTimeout(tor);
    tor=0;
}

function startupdate(force,log) {
    stopupdate(log);
    tor=setTimeout(updateBar, refreshtimeout);
    if (log) console.log("updating call:stop",tor,refreshtimeout,boxopen);
}
