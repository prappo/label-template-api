import type { NextApiRequest, NextApiResponse } from "next";
import rect from '../../dummy/rect.json'
import fs from 'fs'
import https from 'https'


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
// })

// rect.datatable.forEach(item => {
//     console.log(item)
// })
export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
    ){
    res.status(200).json(rect)
}