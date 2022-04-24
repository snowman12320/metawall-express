const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema(
    {
        file: {
            type: Object,
            required: [ true, '圖片檔案必填' ]
        }
    },
    {
        versionKey: false
    }
)
const File = mongoose.model('File', fileSchema);

module.exports = File;