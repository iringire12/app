const mongoose = require('mongoose');
// package schema
const packageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true,
        unique: true
    },
    packageDescription: {
        type: String,
        require: true
    },
    packagePrice: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Package', packageSchema);
