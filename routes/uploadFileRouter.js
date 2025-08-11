import { Router } from "express";
import { upload } from "../middlewares/fileUploadMiddleware.js";

export const uploadFileRouter = Router();

uploadFileRouter.post ('/uploadFile', upload.single('profilePic'), (req, res) => {
  if (req.file) {
    res.status(200).json({
      message: 'File uploaded successfully',
      file: req.file
    })
  }
  else {
    res.status(400).json({
      message: 'No file uploaded'
    })
  }
}) 