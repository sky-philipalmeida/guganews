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

WinJS.UI.processAll().then(function () {

   WinJS.Navigation.addEventListener("navigating", function (e) {

    var elem = document.getElementById("contentTarget");

    // WinJS.UI.Animation.exitPage(elem.children).then(function () {

        WinJS.Utilities.empty(elem);

    // console.log(e.detail.location);

    WinJS.UI.Pages.render(e.detail.location, elem)
    .then(function () {

        if (e.detail.location=="/list.html"){


            var local = e.detail.state;
            
            WinJS.Utilities.setInnerHTML(
                WinJS.Utilities.query("#appHeaderTitle")[0]
                , 'Guganews <b>'+local+'</b>');


        }


        var enterPage = WinJS.UI.Animation.enterPage(elem.children);

        enterPage.done(
            function(){

            WinJS.Utilities.query("a")
                .listen("click",
                    function(e){
                            // console.log(this);
                            e.returnValue =false;
                            e.preventDefault();
                            e.stopPropagation();
                            
                           window.open(this.href,'Guganews');
                    });
                    // console.log(datta);
                    if (e.detail.location=="/index.html"){

                        WinJS.Utilities.query(".listviewpivotitem")
                        .listen("iteminvoked", 
                            function(invoke){ 

                                    // console.log(invoke.detail.itemPromise._value.data);
                                    // WinJS.Navigation.navigate("/list.html");
                                    getNews(invoke);

                                }, false);
                    }

                    if (e.detail.location=="/list.html"){

                        WinJS.Utilities.query(".listviewpivotitem")
                        .listen(
                            "iteminvoked", 
                            function(invoke){ 
                                    //console.log(this);
                                    var index  = invoke.detail.itemIndex;
                                    // console.log(invoke.detail.itemPromise._value.data)
                                    var clicked = invoke.detail.itemPromise._value.data;
                                    // console.log(invoke);
                                    // window.location=clicked.link;
                                    // window.open(clicked.link, "_blank", "fullscreen=yes,height=600,width=800,scrollbars=yes,resizable=no");
                                    transitionBetweenContent(
                                        invoke
                                        ,clicked.id
                                        ,clicked.id2
                                        ,function(){
                                            var list=document.getElementById("pivotScenario3").winControl._currentItem._contentElement.firstElementChild.winControl;
                                                // console.log("Ensure visible");
                                                list.ensureVisible(index)
                                            }
                                            );
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

function getNews(invoke){

    var spinner = spin();

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

    RequestDataInternal = invoke.detail.itemPromise._value.data;

    // console.log(RequestDataInternal);

    var ned = RequestDataInternal.url.substr(RequestDataInternal.url.indexOf('=')+1);
    var hl = ned.substr(0,ned.indexOf('_'));

    var requests = list.map(function(item){

        // console.log(item);

        var head= document.getElementsByTagName('head')[0];
        var script= document.createElement('script');
        var error= false;

        var topic = item;
        script.type= 'text/javascript';
        script.onerror = function(){
            if (error) return;
            error=true;
            var contentDialog = document.querySelector(".win-contentdialog").winControl;
            contentDialog._dom.commands[0].addEventListener(
                'click'
                ,function(){
                 window.location.reload();
            });
            contentDialog.show();
            return;
        }

        script.src= "http://ajax.googleapis.com/ajax/services/feed/load?context="+topic+"&callback=processResults&num=-1&v=1.0&q=https%3A%2F%2Fnews.google.com%2Fnews%2Ffeeds%3Fpz%3D1%26cf%3Dall%26ned%3D"+ned+"%26hl%3D"+hl+"%26topic%3D"+topic+"%26output%3Drss";
        //console.log(script.src);

        head.appendChild(script);
        if(item=='h') script.onload=function(){
            var name  = invoke.detail.itemPromise._value.data.name;
            WinJS.Navigation.navigate("/list.html",name).done(
                function(){
                    spinner.stop();
                }
            );
        };

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

function spin(){
    var opts = {
            lines: 8, // The number of lines to draw
            length: 0, // The length of each line
            width: 15, // The line thickness
            radius: 31, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            direction: 1, // 1: clockwise, -1: counterclockwi
            color: '#61ba7f', // #rgb or #rrggbb or array of col
            speed: 1, // Rounds per second
            trail: 50, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: true, // Whether to use hardware acceler
            className: 'spinner', // The CSS class to assign
            zIndex: 999, // The z-index (defaults to 20000000
            top: '50%', // Top position relative to parent
            left: '50%' // Left position relative to parent
        };
        var target = document.getElementById('progress');
        var spinner = new Spinner(opts).spin(target);
        return spinner;
}

var actout=0;
var actin=0;
function transitionBetweenContent(invoke,id,id2,cb) {

    var incoming;
    var outgoing;
    var output1=document.querySelectorAll('[name="'+id+'"]')[0];
    var output2=document.querySelectorAll('[name="'+id2+'"]')[0];
    

    // Assign incoming and outgoing
    if (output2.style.display === "none") {
        incoming = output2;
        outgoing = output1;
    } else {
        incoming = output1;
        outgoing = output2;
    }
    if (actin){
        if(actin==outgoing){
            return;

        } else {
            actout.style.display = "block";
            actin.style.display = "none";
            actout.style.opacity = 1;
            actin.style.opacity = 0;
            actin.style.backgroundColor="#fff";
            actout.style.backgroundColor="#fff";
        }
    } 

    actout=outgoing;actin=incoming;

    WinJS.UI.executeTransition(incoming,
    {
        property: "background-color",
        delay: 0,
        duration: 400,
        timing: "linear",
        from: "#fff",
        to: "#EEE"
    });

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
        WinJS.UI.executeTransition(incoming,
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

    return;
    // Run the exitContent animation and then the enterContent animation
    // Use the recommended offset by leaving the offset argument empty to get the best performance
   /* WinJS.UI.Animation.exitContent(output, null).done(function () {


        return WinJS.UI.Animation.enterContent(output).done(function(){
                    outgoing.style.display = "none";
        incoming.style.display = "block";
            cb();
        });
});*/
}

