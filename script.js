const https = require("https");
const fs = require("fs");
const cheerio = require("cheerio");

const rect = require("./dummy/round.json");

const request = require("request-promise-native");
const path = require("path");


async function sleep(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

// async function run() {
//   // const urls = await fetchUrls(INITIAL_URL);
//   const urls =[ 'lkjsdf','lsdkf','sdfkls']
//   for (const url of urls) {
//     await sleep(1000);
//     console.log(url)
//     // const $ = await fetchPage(url);
//     // do stuff with cheerio-processed page
//   }

//   for(const item of rect.datatable){
//     await sleep(2000);
//     const $ = await fetchPage(item.URL_Col4_1);
//     $('.col-xs-6').each((index,el) => {
//       console.log($(el).text());
//     })
//   }
// }

// run();

// image downloader

rect.datatable.forEach(item => {
    const url = item.ImgSrc_Col5_1;
    // console.log(url)
    https.get(url,(res) => {
        var filename = item.ImgSrc_Col5_1.replace(/^.*[\\\/]/, '')
        // Image will be stored at this path
        console.log(filename)
        const path = `${__dirname}/assets/${filename}`;
        const filePath = fs.createWriteStream(path);
        res.pipe(filePath);
        filePath.on('finish',() => {
            filePath.close();
            console.log('Download Completed');
        })
    })
})

// scraper

async function scrapData() {
  const originalData = []

  for (const item of rect.datatable) {
    await sleep(2000);
    const url = item.URL_Col4_1;
    const preview =  item.ImgSrc_Col5_1.replace(/^.*[\\\/]/, '');
    
    try {
      https.get(url, function (res) {
        var arr = [];
        res.setEncoding("utf8");
        res.on("data", function (data) {
          var html = cheerio.load(data);
          var selectedElements = ".col-xs-6";
          html(selectedElements).each((index, el) => {
            var ddd = html(el).text();

            arr.push(ddd);
          });
        });

        res.on("end", () => {
          var obj = {};
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].includes(":")) {
              var property = arr[i]
                .replace(" ", "_")
                .replace(":", "")
                .replace(" ", "_")
                .toLowerCase();
              obj[property] = arr[i + 1];
            }
          }
          obj['preview'] = preview;
          originalData.push(obj);
          console.log(obj);
        });

        res.on("error", function () {
          console.log("hmm");
        });
      });
    } catch (err) {
      console.log("err happen");
    }
  }

  const path = `${__dirname}/data/square.json`;
  const storeData = (data, path) => {
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
      console.error(err)
    }
  }

  storeData(originalData,path)
}

// scrapData();
