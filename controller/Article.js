var requestOut = require('request');
var Config = require('../config.js');
var cache = require('memory-cache');
var fs = require('fs');

if (Config.cachefile) {
    fs.readFile(Config.cachefilename, Config.cachecoding, function (err,data) {
        if (err) {
            console.log('Error', err);
        } else {
            var sizecache = cache.importJson(data)
            console.log("Cache size",sizecache);
        }
      });
}

var processed = 0;
function getArticle() {}
getArticle.prototype.get = function (request, response) {

    response.writeHead(200, {"Content-Type": "application/json"}); 

    var name = request.get.name || Config.keywords.name
    var to = request.get.to || Config.keywords.to
    var from = request.get.from || Config.keywords.from
    var location = request.get.location || Config.newsitems.location
    var hash = request.get.keywords+location
    var cached=cache.get(hash);

    if (cached) {
        console.log("Art from cache!", hash/*, JSON.parse(cached)*/);
        if (Config.cachefile) {
            fs.writeFile(Config.cachefilename, cache.exportJson(), Config.cachecoding, function (err,data) {
                if (err) {
                  return console.log('error',err);
                }
                console.log('Cache written', Config.cachefilename);
              });
        }
        response.end(cached);
        return;
    }

    let topics = request.get.keywords.split(',')

    // var keywords = request.get.keywords ? ',{"keyword": {"$and": ["'+request.get.keywords+'"]}}' : ""
    topics.forEach((topic)=>{
        // console.log(topic)
        getArticle.prototype.translate(hash, topic, topics, from, to, location, name, response)
    })

    // Caching results not yet ready - advise client to wait -accepted
    
/*
    var keywords = request.get.keywords ? ',{"keyword": {"$and": ["'+request.get.keywords+'"]}}' : ""

    var out = requestOut.get({
            url: Config.urls.events,
            qs: {
                "apiKey": Config.apikey,
                "query": '{"$query": {"$and": [{"locationUri": {"$or": ["'+location+'"]}}'+keywords+']}}',
                "action": "getEvents",
                "resultType": "events",
                "eventsSortBy": "date",
                "eventsCount": Config.newsitems.total,
                "eventsEventImageCount":  Config.newsitems.images
            }
        },
        function (error, response2, body) {
            // console.log(body);
            response.writeHead(200, {"Content-Type": "application/json"}); 
            response.end(body);
        });
        //console.log(out)
        */
}

getArticle.prototype.articleprocessor = function(hashin, keywords, location, name, to, response){

    console.log("keywords", keywords);

    // var keywords = (keywords)  ? ',{"keyword": {"$or": ["'+keywords.join('","')+'"]}}' : ""
    var keywords = keywords ? keywords : [name]
    var availableLangs=['ar','en','cn','de','es','fr','he','it','nl','no','pt','ru','sv','ud']

    var setup = {
        url: Config.urls.events,
        qs: {
            // "apiKey": Config.apikey,
            // "query": '{"$query": {"$and": [{"locationUri": {"$or": ["'+location+'"]}}'+keywords+']}}',
            // "action": "getEvents",
            // "resultType": "events",
            // "eventsSortBy": "date",
            // "eventsCount": Config.newsitems.total,
            // "eventsEventImageCount":  Config.newsitems.images
            "q":"("+keywords.join(' OR ')+")",
            "language":(availableLangs.find(l=>l==to))?to:Config.keywords.to,
            "sortBy":"publishedAt",
            "from": new Date(Date.now() - 86400000*2).toISOString().slice(0,10), // 2 days ago
            "apiKey":Config.apikey
        }
    };
    // https://newsapi.org/v2/everything?sortBy=publishedAt&from=2017-12-02language=pt&q=portugal%20tecnologia&apiKey=
    console.log("Setup", setup);
    var out = requestOut.get(setup,
        function (error, responsein, body) {
            cache.put(hashin, body, Config.cachetimeout);
            response.end(body);
        });
}

getArticle.prototype.translateprocessor = function(hashin, topics, value, location, name, to, response){

    var hash = hashin+topics.length
    var hashdata = hashin+topics.length+1

    var cached = cache.get(hash);
    var cacheddata = cache.get(hashdata);

    if (cached) {
        cache.put(hash, ++cached);
        console.log("caching",hash,cached,topics,value);
        cache.put(hashdata, cacheddata.concat(value.text[0]));
    } else {
        cache.put(hash, cached=1);
        console.log("caching",topics,value);
        try {
            cache.put(hashdata, [(value.text[0])]);
        } catch(e) {
            cache.put(hashdata,0);
        } finally {
            console.log("popcorn")
        }
        
    }

    if (cached===topics.length){
        cacheddata = cache.get(hashdata);
        console.log('All is translated!', topics, cacheddata);
        getArticle.prototype.articleprocessor(hashin, cacheddata, location, name, to, response)
    }
}

getArticle.prototype.translate = function (hashin, topic, topics, from, to, location, name, response) {
    var hash=topic+from+to
    var cached=cache.get(hash);
    if (cached) {
        console.log("Translate from cache!", cached);
        getArticle.prototype.translateprocessor(hashin, topics, cached, location, name, to, response)
        return cached;
    }
    var transreq={
        url: Config.urls.translation,
        qs: {
            "key": Config.apikeylang,
            "text": topic,
            "lang": from+"-"+to
        }
    }
    console.log(transreq);
    var out = requestOut.get(transreq, 
    function (error, responsein, body) {
        try {
            jbody = JSON.parse(body);
        } catch(e){
            console.log("Response error", error, responsein, body);
            jbody = {}
        }
        getArticle.prototype.translateprocessor(hashin, topics, jbody, location, name, to,  response)
        cache.put(hash, jbody); 
        return jbody;
    });
}


module.exports = getArticle;