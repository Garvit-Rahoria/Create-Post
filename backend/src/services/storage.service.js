const { ImageKit } = require("@imagekit/nodejs")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function uploadFile(buffer, fileName) {

    const result = await imagekit.files.upload({
        file: buffer.toString("base64"),
        fileName
    })
    return result;
}

module.exports = uploadFile;

