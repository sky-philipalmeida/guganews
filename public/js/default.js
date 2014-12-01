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

var sheet = (function() {
    // Create the <style> tag
    var style = document.createElement("style");

    // Add a media (and/or media query) here if you'd like!
    // style.setAttribute("media", "screen")
    // style.setAttribute("media", "only screen and (max-width : 1024px)")

    // WebKit hack :(
    style.appendChild(document.createTextNode(""));

    // Add the <style> element to the page
    document.head.appendChild(style);

    return style.sheet;
})();


function addCSSRule(sheet, selector, rules, index) {
    if("insertRule" in sheet) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    }
    else if("addRule" in sheet) {
        sheet.addRule(selector, rules, index);
    }
}

function setTheme(color){

        currentcolor=color?color:'yellowgreen';// '#61ba7f';

        // Use it!
        // 
        addCSSRule(document.styleSheets[0], 
           ".bgcolor"
           , "background-color: "+currentcolor+" !important");

        addCSSRule(document.styleSheets[0], 
           ".fontcolorselect,.fontcolor2 a, .fontcolor2 a b,a"
           , "color: "+currentcolor+" !important");

        addCSSRule(document.styleSheets[0], 
           ".morehiddenblock"
           , "border-top:1px solid "+currentcolor+" !important");

        addCSSRule(document.styleSheets[0], 
           ".morehiddenblock"
           , "border-bottom:1px solid "+currentcolor+" !important");


        var t = new Trianglify({
          fillOpacity:'0.5', 
          strokeOpacity: '0.5', 
          cellsize: '350',
          x_gradient:[currentcolor,'#000000'],
          y_gradient:[currentcolor,'#000000'],
        });

        var pattern = t.generate(document.body.clientWidth, document.body.clientHeight);
        document.body.setAttribute('style', 'background-image: '+pattern.dataUrl);
}

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

            item.year=item.publishedDate.getFullYear();
            item.month= item.publishedDate.getMonth()+1;
            item.day= item.publishedDate.getDate();
            item.monthyear= item.month+"/"+item.year;
            
            loadImageForItem(item,item.id3);
            
            return item;

        }
    );
    // console.log(data);
    window["data_"+topic] = { 
        dataSource: new WinJS.Binding.List(data).dataSource 
    };
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
        setTheme();
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
        // 
    }
})


WinJS.Navigation.navigate("/index.html");
