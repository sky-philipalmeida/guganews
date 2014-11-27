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
function loadImages(id3) {
    /*
    WinJS.Namespace.define("Sample.ListView", {
        dataSource:  window["data_img_"+id]
    });
    
    WinJS.UI.processAll();*/

    var l=document.querySelectorAll('[name="'+id3+'"]')[0]
    l.winControl.itemDataSource=window[id3];
    
}


function imageLoadErrorEvent(imgin) {

        imgin.src="/images/background.svg";
        imgin.style.width='0px !important';
                imgin.style.height='0px !important';
    

}
function imageLoadEvent(imgin) {
    
        //imgin.src="/images/background.svg";
        imgin.style.width=imgin.width+"px !important';";
        imgin.style.height=imgin.height+"px !important';";
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
