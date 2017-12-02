var Config = {
  name : "Portugal",
  cachefile : 1,
  cachefilename: 'gugacache.json',
  cachecoding: 'utf8',
  baseurl: "http://www.guganews.com",
  port : 8080,
  host : "0.0.0.0",
  apikey      : process.env.NAPI,
  apikeylang  : process.env.TRANS_KEY,
  cachetimeout     :  1000*60*60*12, // 12 hours
  cachetimeoutlong :  1000*60*60*24*365, // One year
  keywords : {
    from: 'en',
    to: 'en',
    business: ['business','companies','money','stocks'],
    sports: ['sports','tennis','hockey','futebol', 'basket']
  },
  newsitems : {
      total: 100,
      images: 5,
      location : "http://en.wikipedia.org/wiki/Portugal",
      endpoint:"/getarticle?keywords=${topic}&location=${location}&from=${from}&to=${to}"
  },
  urls: {
    events: "https://newsapi.org/v2/everything",
    location: 'http://eventregistry.org/json/suggestLocations?prefix=${country}&lang=eng',
    translation: 'https://translate.yandex.net/api/v1.5/tr.json/translate'
  }
}

module.exports = Config;
