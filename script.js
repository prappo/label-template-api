const https = require("https");
const fs = require("fs");
const cheerio = require("cheerio");

const rect = require("./dummy/rect.json");

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

// rect.datatable.forEach(item => {
//     console.log(item.URL_Col4_1)
// })

const url = "https://www.sheetlabels.com/labels/SL700";

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
        var property = arr[i].replace(' ','_').replace(':','').replace(' ','_').toLowerCase();
        obj[property] = arr[i + 1];
      }
    }

    console.log(obj);
  });
});