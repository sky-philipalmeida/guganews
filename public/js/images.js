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
    

}
function imageLoadEvent(imgin) {
    
    // img.style.display='block';
}