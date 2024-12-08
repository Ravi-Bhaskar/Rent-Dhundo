import Rent from '../models/Rent.js';


//create new rent
export const createRent = async (req, res) => {
    const newRent = new Rent({...req.body, currentOwner: req.user.id, photo01: req.files.photo01[0].filename, photo02: req.files.photo02[0].filename, photo03: req.files.photo03[0].filename });
    try {
        const savedRent = await newRent.save();

        res.status(200).json({success:true, message:"Successfully created", data: savedRent,});
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to create. Try again",});
    }
}

//update rent 
export const updateRent = async(req, res) => {

    const id = req.params.id
    try {

        const updatedRent = await Rent.findByIdAndUpdate(id, {
            $set: req.body
        }, {new:true})

        res.status(200).json({success:true, message:"Successfully Updated", data: updatedRent,});

    } catch (err) {
        res.status(500).json({success:false, message:"failed to update",});
    }
};

//delete rent 
export const deleteRent = async(req, res) => {
    const id = req.params.id

    try {

        await Rent.findByIdAndDelete(id);

        res.status(200).json({success:true, message:"Successfully Deleted",});

    } catch (err) {
        res.status(500).json({success:false, message:"failed to delete",});
    }
};

//getSingle rent 
export const getSingleRent = async(req, res) => {
    const id = req.params.id
    
    try {

        const rent = await Rent.findById(id).populate("currentOwner", '-password').populate('reviews');

        res.status(200).json({success:true, message:"Successfully Found", data:rent,});

    } catch (err) {
        res.status(404).json({success:false, message:"Not Found",});
    }
};

//getAll rent 
export const getAllRent = async(req, res) => {

    //for pagination
    const page = parseInt(req.query.page);

    try {

        const rents = await Rent.find({}).populate("currentOwner", '-password').populate('reviews').skip(page * 9).limit(9);

        res.status(200).json({success:true, count:rents.length, message:"Successfully Found", data:rents,});
    } catch (err) {
        res.status(404).json({success:false, message:"Not Found",});
    }
};


//get rent by search 
export const getRentBySearch = async(req, res) => {

    //here 'i' means case sensitive
    const city = new RegExp(req.query.city, "i");
    
    try {
        const rents = await Rent.find({city}).populate("currentOwner", '-password').populate('reviews');

        res.status(200).json({success:true, count:rents.length, message:"Successfully Found", data:rents,});
    } catch (err) {
        res.status(404).json({success:false, message:"Not Found",});
    }

};

//get featured rent 
export const getFeaturedRent = async(req, res) => {
    try {
        const rents = await Rent.find({featured:true}).populate("currentOwner", '-password').populate('reviews').limit(9);

        res.status(200).json({success:true, count:rents.length, message:"Successfully Found", data:rents,});
    } catch (err) {
        res.status(404).json({success:false, message:"Not Found",});
    }
};

//get rent counts 
export const getRentCount = async(req, res) => {
    try {
        const rentCount = await Rent.estimatedDocumentCount();

        res.status(200).json({success:true, data:rentCount,});
    } catch (err) {
        res.status(500).json({success:false, message:"Failed to fetch",});
    }
};
