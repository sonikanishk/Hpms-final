const express = require('express')
const router = express.Router()

const{
    registerController,
    SignInController,
    forgotPasswordController,
    resetPasswordController,
    queryController,
    doctorController,
    donorController,
    staffController,
    docController,
    donorsController,
    stafffController,
    queriesController,
    deleteQueryController,
    deleteDonorController,
    deleteDoctorController,
    addDoctorController,
    addDonorController,
    addAppointmentController,
    appointmentController,
    deleteAppointmentController,
    userController,
    ansQueryController,
    deleteStaffController,
    addStaffController
} = require("../controllers/auth.controller.js")
const{
    adminregisterController,
    adminSignInController
} = require('../controllers/admin.controller.js')
const {
    validSign,
    validLogin,
    forgotPasswordValidator,
    resetPasswordValidator,
    queryValidator,
    doctorValidator,
    donorValidator
} = require('../helpers/valid')


router.post('/register',validSign,registerController)
router.post('/login',validLogin,SignInController)
router.post('/query',queryValidator,queryController);
router.put('/forgotpassword', forgotPasswordValidator, forgotPasswordController);
router.put('/resetpassword', resetPasswordValidator, resetPasswordController);
router.get('/doctors',doctorController);
router.get('/donor',donorController);
router.get('/staff',staffController);
router.get('/queries',queriesController);
router.get('/users',userController);
router.get('/appointments',appointmentController);
router.post('/doc',docController);
router.post('/donors',donorsController);
router.post('/ansQuery',ansQueryController);
router.post('/stafff',stafffController);
router.post('/adminlogin',validLogin,adminSignInController);
router.post('/adminsignup',validSign,adminregisterController);
router.post('/deleteQuery',deleteQueryController);
router.post('/deleteDonor',deleteDonorController);
router.post('/deleteDoctor',deleteDoctorController);
router.post('/deleteStaff',deleteStaffController);
router.post('/adddoctor',doctorValidator,addDoctorController);
router.post('/adddonor',donorValidator,addDonorController);
router.post('/addappointment',addAppointmentController);
router.post('/cancelAppointment',deleteAppointmentController);
router.post('/addstaff',addStaffController);


module.exports = router
