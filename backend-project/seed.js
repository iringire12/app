const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Package = require('./models/Package');
const User = require('./models/User');
const Car = require('./models/Car');
const Service = require('./models/ServiceRecord');
const Payment = require('./models/Payment');

const seedData = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);

        // clear existing data
        await User.deleteMany({});
        await Package.deleteMany({});

        // create default admin (user)
        const admin = new User({
            username: 'admin',
            password: 'password123'
        });
        await admin.save();
        console.log('Admin user created');

        // create default packages
        const packages = [
            {
                packageName: 'Basic Wash',
                packageDescription: 'Exterior hand wash and tire shine',
                packagePrice: 5000
            },
            {
                packageName: 'Interior Clean',
                packageDescription: 'Vacuuming, dashboard wipe, and window cleaning',
                packagePrice: 7000
            },
            {
                packageName: 'Full service',
                packageDescription: 'Exterior wash + Interior clean + Waxing',
                packagePrice: 15000
            }
        ];
        await Package.insertMany(packages);
        console.log('Default packages seeded');
        console.log('Database seeded successfully');
        process.exit();
    } catch(error){
        console.error('Error seeding database', error);
        process.exit(1);
    }
};
seedData();
