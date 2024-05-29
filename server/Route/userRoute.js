const express = require('express')
const userController = require('../Controller/userController')
const authController = require("../Controller/authController")
const xrplController = require("../Controller/xrplController")
const router = express.Router()

router.post(process.env.signup, authController.signup)
router.post(process.env.login, authController.login)
router.post(process.env.protect, authController.protect)



router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)

router.route('/checkemail/:email').get(userController.CheckEmail)

router
    .route(process.env.verifyotp)
    .post(userController.verifyOTP)

// router.put('/updateUser/:id', userController.updateUser);
router.put(process.env.updateUserWithID, userController.updateUser);



router
    .route(process.env.id)
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.updateUser)



router.post(process.env.addxrplaccount,xrplController.addXrplAccount);
router.post(process.env.getxrplbalance,xrplController.getxrplBalance);
router.post(process.env.getTokens,xrplController.getTokens);




module.exports = router