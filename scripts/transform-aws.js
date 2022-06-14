const fs = require('fs');
const jimp = require('jimp');



async function resize(fileName, filePath) {
    try {
        console.log(fileName);
        // Read the image.
        const image = await jimp.read(filePath);

        // Resize the image to width 150 and auto height.
        await image.resize(48, jimp.AUTO);

        // Save and overwrite the image
        await image.writeAsync('../aws/' + fileName.replace(/Arch_/, '').replace(/_48/, '').trim());

    } catch (e) {
        console.log('ERROR: ' + fileName);
        console.log(e);
    }
}

fs.readdir('../temp/', (err, dirs) => {
    dirs.forEach(dir => {
        console.log(dir);
        fs.readdir('../temp/' + dir + '/Arch_48', (err, files) => {
            if (files) {
                files.filter(f => f.endsWith("_48.png")).forEach(file => {
                    resize(file, '../temp/' + dir + '/Arch_48/' + file);
                });
            }
        });
        fs.readdir('../temp/' + dir + '/48', (err, files) => {
            if (files) {
                files.filter(f => f.endsWith("_48.png")).forEach(file => {
                    resize(file, '../temp/' + dir + '/48/' + file);
                });
            }
        });
    });
});
