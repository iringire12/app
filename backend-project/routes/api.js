const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const carController = require('../controllers/carController');
const packageController = require('../controllers/packageController');
const serviceController = require('../controllers/serviceController');
const paymentController = require('../controllers/paymentController');
const authMiddleware = require('../middleware/authMiddleware');

// auth routes
router.post('/login', authController.login);
router.post('/register', authController.register);

// car routes
router.post('/cars', authMiddleware, carController.createCar);
router.get('/cars', authMiddleware, carController.getAllCars);
// package routes
router.post('/packages', authMiddleware, packageController.createPackage);
router.get('/packages', authMiddleware, packageController.getAllPackages);
// service routes
router.post('/services', authMiddleware, serviceController.createService);
router.get('/services', authMiddleware, serviceController.getAllServices);
router.put('/services/:id', authMiddleware, serviceController.updateService);
router.delete('/services/:id', authMiddleware, serviceController.deleteService);
// payments routes
router.post('/payments', authMiddleware, paymentController.createPayment);
router.get('/payments', authMiddleware, paymentController.getAllPayments);
// router.get('/reports/daily');

module.exports = router;
