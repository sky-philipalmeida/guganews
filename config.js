var Config = {
  cachefile : 1,
  cachefilename: 'gugacache.json',
  cachecoding: 'utf8',
  baseurl: "http://www.guganews.com",
  port : 8080,
  host : "0.0.0.0",
  apikey      : process.env.API_KEY,
  apikeylang  : process.env.TRANS_KEY,
  cachetimeout     :  1000*60*60*24*10,
  cachetimeoutlong :  1000*60*60*24*10,
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
    events: "http://eventregistry.org/json/event",
    location: 'http://eventregistry.org/json/suggestLocations?prefix=${country}&lang=eng',
    translation: 'https://translate.yandex.net/api/v1.5/tr.json/translate'
  }
}

module.exports = Config;
