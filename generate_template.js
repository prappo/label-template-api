const fs = require('fs');

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

let templatesCat = []
getDirectories('public/templates').forEach(dir => {
    templatesCat.push(dir)
})

let templatesData = []
function addTemplateToCategory(categories) {
    categories.forEach(cat => {
       let c = require('./public/templates/' + cat + '/index.json');
       templatesData[cat] = c
    })

    return templatesData;
}

let templates = addTemplateToCategory(templatesCat);
let allTemplates = []
// console.log(templates);
for(let cat in templates){
    // console.log(templates[cat])
    templates[cat].forEach(temp => {
        temp.path = cat + '/' + temp.path
        temp.preview = cat + '/' + temp.preview
       allTemplates.push(temp)
    })
}
fs.writeFileSync('./public/templates/index.json', JSON.stringify( allTemplates ));
console.log(allTemplates)

