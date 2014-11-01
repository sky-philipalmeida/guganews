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
            

            var s = item.contentSnippet.lastIndexOf(item.author);
            item.contentSnippet=item.contentSnippet.substr(s+item.author.length);

            var img=/.*src=\"(.*?)\".*/.exec(item.content);
            item.img= (img && typeof img[1]!=='undefined')?img[1]:"images/windows/Square70x70Logo.scale-180.png";

            item.publishedDate = new Date(item.publishedDate);
            
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
    },
    ready: function (element, options) {
        startupdate();
    }
})

WinJS.UI.Pages.define("/index.html", {
    init:function(){
    },
    ready: function (element, options) {
        startupdate(true,true);
    }
})


WinJS.Navigation.navigate("/index.html");
