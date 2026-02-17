const  ServiceRecord = require('../models/ServiceRecord');

// create service record (Insert)
exports.createService = async (req, res) => {
    try{
        const service = new ServiceRecord(req.body);
        await service.save();
        res.status(201).json(service);
    } catch (error){
        res.status(400).json({ message:'Error creating service record', error: error.message });
    }
};

// get all service records  with populated data (retrieving data)
exports.getAllServices = async (req, res) => {
    try{
        const services = await ServiceRecord.find().populate('carId').populate('packageId');
        res.json(services);
    } catch(error){
        res.status(500).json({ message: 'Error fetching services', error: error.message })
    }
};

// update service record (update)
exports.updateService = async (req, res) => {
    try{
        const service = await ServiceRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if(!service) return res.status(404).json({ message: 'Service record not found' });
        res.json(service);
    } catch(error){
        res.status(400).json({ message: 'Error updating  service record', error: error.message })
    }
};

// delete service record (delete)
exports.deleteService = async (req, res) => {
    try{
        const service = await ServiceRecord.findByIdAndDelete(req.params.id);
        if(!service) return res.status(404).json({ message: 'Service record not found' });
        res.json(service);
    } catch(error){
        res.status(500).json({ message: 'Error deleting service record', error: error.message })
    }
};
