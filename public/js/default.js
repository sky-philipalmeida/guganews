/*
var myData = new WinJS.Binding.List([
    { title: "Fire Hydrant", text: "Red", picture: "/pages/hub/images/circle_list1.jpg" },
    { title: "Fire Hydrant", text: "Yellow", picture: "/pages/hub/images/circle_list2.jpg" },
    { title: "Pothole Cover", text: "Gray", picture: "/pages/hub/images/circle_list3.jpg" },
    { title: "Sprinkler", text: "Yellow", picture: "/pages/hub/images/circle_list4.jpg" },
    { title: "Electrical Charger", text: "Yellow", picture: "/pages/hub/images/circle_list5.jpg" },
    { title: "Knob", text: "Red", picture: "/pages/hub/images/circle_list6.jpg" },
    { title: "Fire Hydrant", text: "Red", picture: "/pages/hub/images/circle_list1.jpg" },
    { title: "Fire Hydrant", text: "Yellow", picture: "/pages/hub/images/circle_list2.jpg" },
    { title: "Pothole Cover", text: "Gray", picture: "/pages/hub/images/circle_list3.jpg" },
    { title: "Fire Hydrant", text: "Red", picture: "/pages/hub/images/circle_list1.jpg" },
    { title: "Fire Hydrant", text: "Yellow", picture: "/pages/hub/images/circle_list2.jpg" },
    { title: "Pothole Cover", text: "Gray", picture: "/pages/hub/images/circle_list3.jpg" }
]);
*/


function processResults(topic,result){
    var id=0;
    data = result.feed.entries.map(
        function(item){

            // console.log(item);

            var jornal = item.title.lastIndexOf(' - ');
            switch(item.title.substr(jornal+3).trim()){
                case "Lisboa":
                case "Brasil":
                case "Portugal":
                    jornal = item.title.indexOf(' - ');
                    break;
            }

            item.author = item.title.substr(jornal+3).trim();
            item.title = item.title.substr(0,jornal).trim();
            item.id=topic+"_" +(++id);
            item.id2=topic+"_2_" +id;
            item.id3=topic+"_data_img_"+item.id;
            

            var s = item.contentSnippet.lastIndexOf(item.author);
            item.contentSnippet=item.contentSnippet.substr(s+item.author.length);

            var img=/.*src=\"(.*?)\".*/.exec(item.content);
            item.img= (img && typeof img[1]!=='undefined')?img[1]:"images/windows/Square70x70Logo.scale-180.png";

            item.publishedDate = new Date(item.publishedDate);
            
            loadImageForItem(item,item.id3);
            
            return item;

        }
    );
    // console.log(data);
    window["data_"+topic] = { 
        dataSource: new WinJS.Binding.List(data).dataSource 
    };
}

function loadImageForItem(item,context){
    
    // load images per item
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    var error= false;

    script.type= 'text/javascript';
    script.onerror = function(er){
        console.log(er);
        spinner.stop();
        if (error) {

            return;
        }
        error=true;
        var contentDialog = document.querySelector(".win-contentdialog").winControl;
        contentDialog._dom.commands[0].addEventListener(
            'click'
            ,function(){
                spinner.stop();
                return;
            });
        contentDialog.show();
        return;
    }
    var linkrss = encodeURIComponent(item.title);
    //var context=id;
    script.src="https://ajax.googleapis.com/ajax/services/search/images?context="+context+"&callback=processImagesForResult&v=1.0&imgsz=large&rsz=8&q="+linkrss;
    //console.log(script.src);

    head.appendChild(script);


    
}

function processImagesForResult(context,response){
    
    // console.log(arguments);
    var i = 0;
    
    var data = [];


            if (!response) {
                return;
            }

    
    response.results.map(
        function(item){

            /*
            GsearchResultClass
                    "GimageSearch"

            content
                    "a cantora <b>Janis Joplin</b>,"

            contentNoFormatting
                    "a cantora Janis Joplin,"

            height
                    "300"

            imageId
                    "ANd9GcRC_Xbqbe-awGA63fMG...ANIdVMxU2-7_TwCt9Eaedjw"

            originalContextUrl
                    "http://www.cineclick.com...joplin-em-cinebiografia"

            tbHeight
                    "93"

            tbUrl
                    "http://t0.gstatic.com/im...ANIdVMxU2-7_TwCt9Eaedjw"

            tbWidth
                    "124"

            title
                    "<b>Amy Adams será Janis ...tor de Clube <b>...</b>"

            titleNoFormatting
                    "Amy Adams será Janis Jop...de diretor de Clube ..."

            unescapedUrl
                    "http://static.cineclick....602x0_519fb8dc9bc14.jpg"

            url
                    "http://static.cineclick....602x0_519fb8dc9bc14.jpg"

            visibleUrl
                    "www.cineclick.com.br"

            width
                    "400"
                         */
               
                if (item.url.indexOf("localhost")>=0){
                        
                        return;
                }
            item.width2=item.width+'px';
            item.height2=item.height+'px';
            item.moreResultUrl = response.cursor.moreResultUrl;
            item.idname=context+'_'+(++i);
            item.idname2=context+'_'+i+'_2';

            if (typeof item!="undefined") {
                data.push(item);
            }

        }
    );
    
    // console.log(data);
    window[context] = new WinJS.Binding.List(data).dataSource;

}

WinJS.UI.Pages.define("/list.html", {
    init:function(){


    },
    ready: function (element, options) {

        startupdate();


    
        /*
        back.addEventListener("click", function () {
            WinJS.Navigation.navigate("/index.html");
        });
        */

    }
});
WinJS.UI.Pages.define("/", {
    init:function(){
    },
    ready: function (element, options) {
        startupdate();
        navigator.geolocation.getCurrentPosition(show_map,errorHandler);
    }
})

WinJS.UI.Pages.define("/index.html", {
    init:function(){
    },
    ready: function (element, options) {
        startupdate(true,true);
        // navigator.geolocation.getCurrentPosition(show_map,errorHandler);
    }
})


WinJS.Navigation.navigate("/index.html");
