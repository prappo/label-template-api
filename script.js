const https = require("https");
const fs = require("fs");
const cheerio = require("cheerio");

const rect = require("./dummy/rect.json");

const request = require("request-promise-native");

const INITIAL_URL = "http://your-initial-url.com";

/**
 * Asynchronously fetches the page referred to by `url`.
 *
 * @param {String} url - the URL of the page to be fetched
 * @return {Promise} promise to a cheerio-processed page
 */
async function fetchPage(url) {
  return await request({
    url: url,
    transform: (body) => cheerio.load(body),
  });
}

/**
 * Your initial fetch which will bring the list of URLs your looking for.
 *
 * @param {String} initialUrl - the initial URL
 * @return {Promise<string[]>} an array of URL strings
 */
async function fetchUrls(initialUrl) {
  const $ = await fetchPage(initialUrl);
  // process $ here and get urls
  return ["http://foo.com", "http://bar.com"];
}

/**
 * Clever way to do asynchronous sleep.
 * Check this: https://stackoverflow.com/a/46720712/778272
 *
 * @param {Number} millis - how long to sleep in milliseconds
 * @return {Promise<void>}
 */
async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

async function run() {
  // const urls = await fetchUrls(INITIAL_URL);
  const urls =[ 'lkjsdf','lsdkf','sdfkls']
  for (const url of urls) {
    await sleep(1000);
    console.log(url)
    // const $ = await fetchPage(url);
    // do stuff with cheerio-processed page
  }
  
  for(const item of rect.datatable){
    await sleep(2000);
    const $ = await fetchPage(item.URL_Col4_1);
    $('.col-xs-6').each((index,el) => {
      console.log($(el).text());
    })
  }
}

run();

// image downloader

// rect.datatable.forEach(item => {
//     const url = item.ImgSrc_Col5_1;
//     // console.log(url)
//     https.get(url,(res) => {
//         var filename = item.ImgSrc_Col5_1.replace(/^.*[\\\/]/, '')
//         // Image will be stored at this path
//         console.log(filename)
//         const path = `${__dirname}/assets/${filename}`;
//         const filePath = fs.createWriteStream(path);
//         res.pipe(filePath);
//         filePath.on('finish',() => {
//             filePath.close();
//             console.log('Download Completed');
//         })
//     })
// })

// scraper

// rect.datatable.forEach(async (item) => {
//   const url = item.URL_Col4_1;

//   try {
//     https.get(url, function (res) {
//       var arr = [];
//       res.setEncoding("utf8");
//       res.on("data", function (data) {
//         var html = cheerio.load(data);
//         var selectedElements = ".col-xs-6";
//         html(selectedElements).each((index, el) => {
//           var ddd = html(el).text();

//           arr.push(ddd);
//         });
//       });

//       res.on("end", () => {
//         var obj = {};
//         for (var i = 0; i < arr.length; i++) {
//           if (arr[i].includes(":")) {
//             var property = arr[i]
//               .replace(" ", "_")
//               .replace(":", "")
//               .replace(" ", "_")
//               .toLowerCase();
//             obj[property] = arr[i + 1];
//           }
//         }

//         console.log(obj);
//       });

//       res.on('error',function(){
//         console.log('hmm')
//       })
//     });
//   } catch (err) {
//     console.log("err happen");
//   }
// });

// async function init() {
//   console.log(1);
//   await sleep(1000);
//   console.log(2);
// }
