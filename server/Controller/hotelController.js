const HOTEL = require('../Model/hotelModel')
exports.uploadHotel = async (req, res, next) => {
    try {
        const newHotel = await HOTEL.create(req.body)
        res.json({ hotel: newHotel, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
exports.addhighlight = async (req, res) => {
    try {
        const { hotelID, highlight } = req.body
        const highlights = { highlight: highlight }
        if (hotelID) {
            const addedHighlight = await HOTEL.findByIdAndUpdate(
                { _id: hotelID },
                { $push: { highlights: highlights } },
                { new: true }
            )
            if (addedHighlight) {
                console.log('Highlight added successfully:', addedHighlight);
                return res.json({ data: addedHighlight, status: "success" });
            } else {
                console.error('Hotel not found');
                return res.json({ message: "hotel not found", status: "failed" });
            }
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


exports.addingReminder = async (req, res) => {
    try {
        const { hotelID, reminder } = req.body
        const reminders = { reminder: reminder }
        if (hotelID) {
            const addedReinder = await HOTEL.findByIdAndUpdate(
                { _id: hotelID },
                { $push: { rule: reminders } },
                { new: true }
            )
            if (addedReinder) {
                console.log('Reminder added successfully:', addedReinder);
                return res.json({ data: addedReinder, status: "success" });
            } else {
                console.error('Hotel not found');
                return res.json({ message: "hotel not found", status: "failed" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.updateHotelDetails = async (req, res) => {
    try {
        const { hotelID } = req.body
        const updatedHotel = await HOTEL.findByIdAndUpdate(hotelID, req.body, { new: true });
        if (updatedHotel) {
            res.json({ hotel: updatedHotel, status: "success", message: "Hotel updated successfully" });
        } else {
            res.json({ status: "failed", message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


exports.updateHighlight = async(req,res) =>{
    try {
        const { hotelID, highlightID } = req.body;
        const hotel = await HOTEL.findById(hotelID);
        const foundHighlight = hotel.highlights.find(highlight => highlight._id == highlightID);
        if (foundHighlight) {
            foundHighlight.highlight = req.body.highlight;
            await hotel.save();
            res.json({ hotel,meaasge : "updated succcessfully", status: "success" });
        } else {
            res.json({ status: "failed", message: "Highlight not found" });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ status: "failed", message: error.message });
    }
}

exports.updateReminder = async(req,res) =>{
    try {
        const { hotelID, reminderID } = req.body;
        const hotel = await HOTEL.findById(hotelID);
        const foundReminder = hotel.rule.find(reminder => reminder._id == reminderID);
        if (foundReminder) {
            foundReminder.reminder = req.body.reminder;
            await hotel.save();
            res.json({ hotel,meaasge : "updated succcessfully", status: "success" });
        } else {
            res.json({ status: "failed", message: "Highlight not found" });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ status: "failed", message: error.message });
    }
}

exports.deleteReminder = async (req, res) => {
    try {
        const { hotelID, reminderID } = req.body;
        const hotel = await HOTEL.findById(hotelID);
        const foundReminderIndex = hotel.rule.findIndex(reminder => reminder._id == reminderID);
        
        if (foundReminderIndex !== -1) {
            hotel.rule.splice(foundReminderIndex, 1); 
            await hotel.save();
            res.json({ hotel, message: "Reminder deleted successfully", status: "success" });
        } else {
            res.json({ status: "failed", message: "Reminder not found" });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ status: "failed", message: error.message });
    }
}

exports.deleteHighlight = async (req, res) => {
    try {
        const { hotelID, highlightID } = req.body;
        const hotel = await HOTEL.findById(hotelID);
        const foundHighlightIndex = hotel.highlights.findIndex(highlight => highlight._id == highlightID);
        
        if (foundHighlightIndex !== -1) {
            hotel.highlights.splice(foundHighlightIndex, 1); 
            await hotel.save();
            res.json({ hotel, message: "Highlight deleted successfully", status: "success" });
        } else {
            res.json({ status: "failed", message: "Highlight not found" });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ status: "failed", message: error.message });
    }
}




exports.addHotelImage = async (req, res) => {
    try {
        const { hotelID } = req.body
        const imageSchema = {
            imageUrl : req.file.filename
        }
        if (hotelID) {
            const addedImages = await HOTEL.findByIdAndUpdate(
                { _id: hotelID },
                { $push: { hotelimages: imageSchema } },
                { new: true }
            )
            if (addedImages) {
                console.log('Hotel Image added successfully:', addedImages);
                return res.json({ data: addedImages, status: "success" });
            } else {
                console.error('Hotel not found');
                return res.json({ message: "hotel not found", status: "failed" });
            }
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


exports.deleteHotelImage = async (req, res) => {
    try {
        const { hotelID, hotelimageID } = req.body;
        const hotel = await HOTEL.findById(hotelID);
        const foundHotelImageIndex = hotel.hotelimages.findIndex(image => image._id == hotelimageID);
        
        if (foundHotelImageIndex !== -1) {
            hotel.hotelimages.splice(foundHotelImageIndex, 1); 
            await hotel.save();
            res.json({ hotel, message: "Hotel image deleted successfully", status: "success" });
        } else {
            res.json({ status: "failed", message: "Hotel image not found" });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.json({ status: "failed", message: error.message });
    }
}






