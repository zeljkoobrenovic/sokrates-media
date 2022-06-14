const fs = require('fs');
const jimp = require('jimp');



async function resize(fileName) {
    try {
        console.log(fileName);
        // Read the image.
        const image = await jimp.read('../temp/' + fileName);

        // Resize the image to width 150 and auto height.
        await image.resize(48, jimp.AUTO);

        // Save and overwrite the image
        await image.writeAsync('../lang/' + fileName);

    } catch (e) {
        console.log('ERROR: ' + fileName);
        console.log(e);
    }
}

fs.readdir('../temp/', (err, files) => {
    files.filter(f => f.endsWith(".png")).forEach(file => {
        resize(file);
    });
});
