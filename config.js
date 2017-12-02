var Config = {
  cachefile : 1,
  cachefilename: 'gugacache.json',
  cachecoding: 'utf8',
  baseurl: "http://www.guganews.com",
  port : 8080,
  host : "0.0.0.0",
  apikey      : "262c8a69-a337-4caa-882c-aa3426fbca02", //process.env.apikey || "342f4d9f-689d-48f1-b4bc-34cbdbb1745d",
  apikeylang  : process.env.apikeylang || "trnsl.1.1.20171118T192403Z.5dae56c21f10dd02.340a8fc76bb2e6f96d02a831c3df210756adbb16", //"trnsl.1.1.20171108T205952Z.dd3888adeecde2e5.455eb8d908e862fff5308b33afecf931d87f3611",
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
