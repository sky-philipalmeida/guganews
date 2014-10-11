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
WinJS.UI.Pages.define("/index.html", {
ready:function(){


}
});

function processResults(topic,result){

    data = result.feed.entries.map(
        function(item){

            console.log(item);

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

            var s = item.contentSnippet.lastIndexOf(item.author);
                item.contentSnippet=item.contentSnippet.substr(s+item.author.length);

            var img=/.*src=\"(.*?)\".*/.exec(item.content);
            item.img= (img && typeof img[1]!=='undefined')?img[1]:"";

            item.publishedDate = getelapsedtime(item.publishedDate);
            return item;

        }
    );
    // console.log(data);
    window["data_"+topic] = { dataSource: new WinJS.Binding.List(data).dataSource };
}

WinJS.UI.Pages.define("/list.html", {
    init:function(){

    },
    ready: function (element, options) {

        back.addEventListener("click", function () {
            WinJS.Navigation.navigate("/index.html");
        });

    }
});


WinJS.Navigation.navigate("/index.html");


function getelapsedtime(datestring){

    // create date in UTC
    //create custom test date
    var dlocaltime = new Date(datestring);
    var d1 = new Date(dlocaltime.getUTCFullYear(),dlocaltime.getUTCMonth(), dlocaltime.getUTCDate(), dlocaltime.getUTCHours(),dlocaltime.getUTCMinutes(),dlocaltime.getUTCSeconds());
    //create current date
    var now = new Date();
    var d2 = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    console.log(d1);
    console.log(d2);
    //get date times (ms)
    var d1Time = (d1.getTime());
    var d2Time = (d2.getTime());
     
     
    //calculate the difference in date times
    var diff = d2 - d1;
    //create a new date using the time differences (starts at Jan 1, 1970)
    var dDiff = new Date();
    dDiff.setTime(diff);
    //chop off 1970 and get year, month, day, and hour
    var years = dDiff.getUTCFullYear() - 1970;
    var months = dDiff.getUTCMonth();
    var days = dDiff.getUTCDate()-1; // the date of new Date(0) begin with 1 
    var hours = dDiff.getUTCHours();
    var minutes = dDiff.getUTCMinutes();
    var seconds = dDiff.getUTCSeconds();
    /*console.log("Years:"+years);
    console.log("months:"+months);
    console.log("days:"+days);
    console.log("hours:"+hours);
    console.log("minutes:"+minutes);
    console.log("seconds:"+seconds);*/

    var out = 'Published at ';
    var sminutes = '';
    var shours = '';

    if ( minutes == 1 ) {

        sminutes = minutes + " minute";

    } else {

        sminutes = minutes + " minutes";

    }

    if ( hours == 1 ) {

        shours = hours + " hour";

    } else {

        shours = hours + " hours";

    }

    if (hours==0) {
        return out + sminutes + ' ago';
    } else {
        return out + shours + ' and ' + sminutes + ' ago'; 
    }

}