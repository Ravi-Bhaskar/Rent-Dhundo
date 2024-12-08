import express from 'express';
import multer from "multer";
import { createRent, deleteRent, getAllRent, getFeaturedRent, getRentBySearch, getRentCount, getSingleRent, updateRent } from '../controllers/rentController.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// upload image --- multer ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../frontend/public/rent-images");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname.toLowerCase().split(' ').join('_') + '-' + Date.now() + '.png');
    },
});

const upload = multer({
    storage: storage,
});


//create new rent
router.post("/", upload.fields([
    { name: 'photo01', maxCount: 1 },
    { name: 'photo02', maxCount: 1 },
    { name: 'photo03', maxCount: 1 }
  ]), verifyUser, verifyAdmin, createRent);

//update rent
router.put("/:id", verifyUser, verifyAdmin, updateRent);

//delete rent
router.delete("/:id", verifyAdmin, deleteRent);

//get Single rent
router.get("/:id", getSingleRent);

//get all rents
router.get("/", getAllRent);

//get rent by search
router.get("/search/getRentBySearch", getRentBySearch);

//get featured rent
router.get("/search/getFeaturedRents", getFeaturedRent);

//get rent count
router.get("/search/getRentCount", getRentCount);


export default router;