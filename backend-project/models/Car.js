const mongoose = require('mongoose');
// car schema
const carSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        required: true,
        unique: true
    },
    carType: {
        type: String,
        require: true
    },
    carSize: {
        type: String,
        require: true
    },
    driverName: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Car', carSchema);
