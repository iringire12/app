const mongoose = require('mongoose');
// service record schema
const serviceRecordSchema = new mongoose.Schema({
    serviceDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('ServiceRecord', serviceRecordSchema);
