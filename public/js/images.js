/*
function loadImages() {
    
    var itemArray =[
            { title: "Marvelous Mint", text: "Gelato", picture: "/images/fruits/60Mint.png" },
            { title: "Succulent Strawberry", text: "Sorbet", picture: "/images/fruits/60Strawberry.png" },
            { title: "Banana Blast", text: "Low-fat frozen yogurt", picture: "/images/fruits/60Banana.png" },
            { title: "Lavish Lemon Ice", text: "Sorbet", picture: "/images/fruits/60Lemon.png" },
            { title: "Creamy Orange", text: "Sorbet", picture: "/images/fruits/60Orange.png" },
            { title: "Very Vanilla", text: "Ice Cream", picture: "/images/fruits/60Vanilla.png" },
            { title: "Banana Blast", text: "Low-fat frozen yogurt", picture: "/images/fruits/60Banana.png" },
            { title: "Lavish Lemon Ice", text: "Sorbet", picture: "/images/fruits/60Lemon.png" }
    ];

    var items = [];

    // Generate 160 items
    for (var i = 0; i < 20; i++) {
        itemArray.forEach(function (item) {
            items.push(item);
        });
    }


    WinJS.Namespace.define("Sample.ListView", {
        data: new WinJS.Binding.List(items)
    });
    WinJS.UI.processAll();
    
}

*/
function loadMedia(id3,id4) {
    /*
    WinJS.Namespace.define("Sample.ListView", {
        dataSource:  window["data_img_"+id]
    });
    
    WinJS.UI.processAll();*/

    try {
        var li=document.querySelectorAll('[name="'+id3+'"]')[0];
        li.winControl.itemDataSource=window[id3];
    } catch(e){ console.log(e);}
    
    try {    
        // console.log(id4);
        if (window[id4]===false) {console.log("NO VIDEOS!!!"); return; };
        var lv=document.querySelectorAll('[name="'+id4+'"]')[0];
        lv.winControl.itemDataSource=window[id4].dataSource;
    } catch(e){ console.log(e);}
    
    
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
    var preimg = [];
    
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
            item.moreResultUrl = response.cursor.moreResultUrl;
            item.idname=context+'_'+(++i);
            item.idname2=context+'_'+i+'_2';

            preimg[item.idname] = new Image();
            preimg[item.idname].src = item.url;

            if (typeof item!="undefined") {
                data.push(item);
            }

        }
    );
    
    window[context] = new WinJS.Binding.List(data).dataSource;

}

function imageLoadErrorEvent(imgin) {

    imgin.style.display="none"

}
function imageLoadEvent(imgin) {

        // console.log(imgin);

        imgin.style.display="block" 
        //imgin.src="/images/background.svg";
        imgin.style.width=imgin.width+"px !important';";
        imgin.style.height=imgin.height+"px !important';";

}

// +----------------------------------------------------------------------------
// | Videos
// +----------------------------------------------------------------------------
function loadVideoForItem(item,context){
    
    // load images per item
    var head= document.getElementsByTagName('head')[0];
    var script= document.createElement('script');
    var error= false;

    // http://gdata.youtube.com/feeds/videos?vq=eminem%20we%20made%20you&max-results=8&alt=json-in-script&callback=showMyVideos&orderby=relevance&sortorder=descending&format=5&fmt=18

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
    //     ="http://gdata.youtube.com/feeds/videos?vq=eminem%20we%20made%20you&max-results=8&alt=json&callback=showMyVideos&orderby=relevance&sortorder=descending&format=5&fmt=18";

    videofunction[context]=function(data){
        // var name = arguments.callee.caller;
        // console.log(context);
        processVideoForResult(data,context);
    };
    var finalname='videofunction.'+context;

    script.src="http://gdata.youtube.com/feeds/videos?vq="+linkrss+"&max-results=20&alt=json&callback="+finalname+"&orderby=relevance&sortorder=descending&format=5&fmt=18";
    //console.log(script.src);

    head.appendChild(script);
    
}

videofunction={};


function processVideoForResult(request,context){
    
    // console.log(context);
    
    /* var entry=request.feed.entry;
    // console.log(request.feed.entry);
    
    entry.map(function(item){
        
       //  console.log(item.link[0].href);
    }); */
    
    // console.log(arguments);
    var i = 0;
    
    var data = [];

    var entry=request.feed.entry;

    if (!entry) {
        window[context]=false;
        return;
    }

    // console.log(context);
    
   
                
    window[context] = new WinJS.Binding.List([]); 
    
    

    entry.map(
        function(item){
               
            item.ourl=item.link[0].href;

            if (typeof item.ourl!=="undefined") {
                
                
                var r = encodeURIComponent(item.ourl);
                WinJS.xhr({ url: "getyoutubeurl/?link="+r })
                    .done(function complete(result) {
                        // console.log(result.responseText);
                        item.url=result.responseText;
                        // data.push();
                        window[context].push(item);
                });                   
            }

        }
    );
    
    // console.log(data);
    
  
}

function videoLoadErrorEvent(imgin) {

}
function videoLoadEvent(imgin) {

}


// Simple but unreliable function to create string hash by Sergey.Shuchkin [t] gmail.com
// alert( strhash('http://www.w3schools.com/js/default.asp') ); // 6mn6tf7st333r2q4o134o58888888888
/*
function strhash( str ) {
    if (str.length % 32 > 0) str += Array(33 - str.length % 32).join("z");
    var hash = '', bytes = [], i = j = k = a = 0, dict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','1','2','3','4','5','6','7','8','9'];
    for (i = 0; i < str.length; i++ ) {
        ch = str.charCodeAt(i);
        bytes[j++] = (ch < 127) ? ch & 0xFF : 127;
    }
    var chunk_len = Math.ceil(bytes.length / 32);   
    for (i=0; i<bytes.length; i++) {
        j += bytes[i];
        k++;
        if ((k == chunk_len) || (i == bytes.length-1)) {
            a = Math.floor( j / k );
            if (a < 32)
                hash += '0';
            else if (a > 126)
                hash += 'z';
            else
                hash += dict[  Math.floor( (a-32) / 2.76) ];
            j = k = 0;
        }
    }
    return hash;
}
*/