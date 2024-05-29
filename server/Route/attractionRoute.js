const express = require('express')
const attractionController = require('../Controller/atttractionController')
const imageController = require("../Controller/imageController")
const router = express.Router()
router.post(process.env.uploadAttraction,attractionController.uploadAttraction)
router.post(process.env.addhighlight,attractionController.addhighlight)

// router.post('/addhighlight',hotelController.addhighlight)
// router.post('/addreminder',hotelController.addingReminder)

// router.put('/updatehotel',hotelController.updateHotelDetails)
// router.put('/updatehighlight',hotelController.updateHighlight)
// router.put('/updatereminder',hotelController.updateReminder)

// router.put('/deletereminder',hotelController.deleteReminder)
// router.put('/deletehighlight',hotelController.deleteHighlight)


// router.put('/addhotelimage',imageController.uploadPhoto,hotelController.addHotelImage)

// router.put('/deletehotelimage',hotelController.deleteHotelImage)










module.exports = router