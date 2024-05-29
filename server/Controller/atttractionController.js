const ATTRACTION = require('../Model/attractionModal')
exports.uploadAttraction = async (req, res, next) => {
    try {
        const newattraction = await ATTRACTION.create(req.body)
        res.json({ attraction: newattraction, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}


exports.addhighlight = async (req, res) => {
    try {
        const { attractionID, highlight } = req.body
        const highlights = { highlight: highlight }
        if (!attractionID) {
            return res.json({ message: "Attraction not found", status: "failed" });
        }
        const addedHighlight = await ATTRACTION.findByIdAndUpdate(
            { _id: attractionID },
            { $push: { highlights: highlights } },
            { new: true }
        )
        if (addedHighlight) {
            console.log('Highlight added successfully:', addedHighlight);
            return res.json({ data: addedHighlight, status: "success" });
        } else {
            console.error('Attraction not found');
            return res.json({ message: "Attraction not found", status: "failed" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}