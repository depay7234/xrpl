const express = require('express')
const hotelController = require('../Controller/hotelController')
const imageController = require("../Controller/imageController")
const router = express.Router()
router.post(process.env.uploadhotel,hotelController.uploadHotel)
router.post(process.env.addhighlight,hotelController.addhighlight)
router.post(process.env.addreminder,hotelController.addingReminder)

router.put(process.env.updatehotel,hotelController.updateHotelDetails)
router.put(process.env.updatehighlight,hotelController.updateHighlight)
router.put(process.env.updatereminder,hotelController.updateReminder)

router.put(process.env.deletereminder,hotelController.deleteReminder)
router.put(process.env.deletehighlight,hotelController.deleteHighlight)


router.put(process.env.addhotelimage,imageController.uploadPhoto,hotelController.addHotelImage)

router.put(process.env.deletehotelimage,hotelController.deleteHotelImage)










module.exports = router