const jimp = require("jimp");
const fs = require("fs");
const path = require("path");


const imagesPath = "game/resource/flash3/images/spellicons";

const images = fs.readdirSync(imagesPath);

const transforms = images.map(img => {
    const p = path.join(imagesPath, img);
    if (!img.endsWith(".png") && !fs.lstatSync(p).isDirectory()) {
        const filename = img.split(".")[0];
        return jimp.read(p)
            .then(lenna => {
                return lenna
                    .write(path.join(imagesPath, filename + ".png")); // save
            })
            .catch(err => {
                console.error(err);
            });
    }
    return Promise.resolve();
});


Promise.all(transforms).then(() => {
    console.log("Transformed all images.")
}).catch(e => {
    console.log(e);
});