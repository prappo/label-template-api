const testFolder = './assets/assets';
const fs = require('fs');

fs.readdir(testFolder, (err, files) => {
    let gg = []
    files.forEach(file => {
        gg.push(file)
    });

    let data = JSON.stringify(files);
    fs.writeFileSync('assets.json', data);
});


