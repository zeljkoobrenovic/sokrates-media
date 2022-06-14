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
        await image.writeAsync('../gcp/' + fileName.trim());

    } catch (e) {
        console.log('ERROR: ' + fileName);
        console.log(e);
    }
}

fs.readdir('../temp/google-cloud-icons/', (err, dirs) => {
    dirs.forEach(dir => {
        console.log(dir);
        fs.readdir('../temp/google-cloud-icons/' + dir, (err, files) => {
            if (files) {
                files.filter(f => f.endsWith(".png")).forEach(file => {
                    resize(file, '../temp/google-cloud-icons/' + dir + '/' + file);
                });
            }
        });
    });
});
