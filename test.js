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
        for (index in c) {
            let templatePath = catPath + '/' + c[index].path
            let templateData = require(templatePath);
            c[index].props = templateData.props;
        }

        templatesFolder.forEach(folder => {
            // let templatePath = catPath + '/templates/' + folder + '/template.json';
            let templateFolder = catPath + '/templates/' + folder;
            // console.log(templatePath)
            // let templateData = require(templatePath);

            fs.readdirSync(templateFolder).forEach(file => {
                if (file.includes('.json')) {
                    let templateF = require(templateFolder + '/' + file)
                    if (templateF.preview != 'preview.png') {
                        let previewImageName = 'preview.png';
                        let buff = Buffer.from(templateF.preview.replace(/^data:image\/png;base64,/, ""), 'base64');
                        fs.writeFileSync(templateFolder + '/' + previewImageName, buff);
                        templateF.preview = previewImageName;
                        templateF.icons = null;
                        fs.writeFileSync(templateFolder + '/' + 'template.json', JSON.stringify(templateF));
                        fs.unlinkSync(templateFolder + '/' + file);
                    }
                }

            })

            

            // c.props = templateData.props
            //    console.log(templateData.props)
        })


        templatesData[cat] = c
    })

    return templatesData;
}

let templates = addTemplateToCategory(templatesCat);
let allTemplates = []
// console.log(templates);
for (let cat in templates) {
    // console.log(templates[cat])
    templates[cat].forEach(temp => {
        temp.path = cat + '/' + temp.path
        temp.preview = cat + '/' + temp.preview
        temp.props = temp.props
        allTemplates.push(temp)
    })
}

console.log('end')
// console.log(allTemplates)

// console.log(templates)

