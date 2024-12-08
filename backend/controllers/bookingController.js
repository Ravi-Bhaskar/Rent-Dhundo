import Booking from "../models/Booking.js";


// create booking
export const createBooking = async(req, res) => {
    const newBooking = new Booking({...req.body, userId: req.user.id});

    try {
        const savedBooking = await newBooking.save();
        res.status(200).json({success: true, message: "Your rent is Booked", data: savedBooking});
    } catch (err) {
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};

// get single booking
export const getBooking = async(req, res) => {
    const id = req.params.id;

    try {
        const book = await Booking.findById(id).populate('rentId');
        res.status(200).json({success: true, message: "Successfully Found", data: book});
    } catch (err) {
        res.status(404).json({success: false, message: "Not Found"});
    }
};

// get all booking
export const getAllBooking = async(req, res) => {

    try {
        const books = await Booking.find({}).populate('rentId');
        res.status(200).json({success: true, count:books.length, message: "Successfully Found", data: books});
    } catch (err) {
        res.status(500).json({success: false, message: "Internal Server Error"});
    }
};