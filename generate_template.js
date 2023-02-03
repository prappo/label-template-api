const fs = require('fs');

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
        return fs.statSync(path + '/' + file).isDirectory();
    });
}

// Get categories
let templatesCat = []
getDirectories('public/templates').forEach(dir => {
    templatesCat.push(dir)
})



// Get template category file data
let templatesData = []
function addTemplateToCategory(categories) {
    categories.forEach(cat => {
        let catPath = './public/templates/' + cat
        let c = require(catPath + '/index.json');

        let templatesFolder = getDirectories(catPath + '/templates')
        templatesFolder.forEach(folder => {
            let templatePath = catPath + '/' + folder + '/template.json';
            console.log(templatePath)
          
            //    let templateData =  JSON.parse(fs.readFileSync(templatePath));
            //    console.log(templateData.props)
        })
        templatesData[cat] = c
    })

    return templatesData;
}

let templates = addTemplateToCategory(templatesCat);
// let allTemplates = []
// // console.log(templates);
// for(let cat in templates){
//     // console.log(templates[cat])
//     templates[cat].forEach(temp => {
//         temp.path = cat + '/' + temp.path
//         temp.preview = cat + '/' + temp.preview
//         temp.props = temp.props
//        allTemplates.push(temp)
//     })
// }
// fs.writeFileSync('./public/templates/index.json', JSON.stringify( allTemplates ));
// console.log(allTemplates)

// console.log(templates)