import multer from "multer";
import path from 'path'
import fs from 'fs'

function getFolderByItsMimeType (mimeType) {
  if (mimeType.startsWith('image/')) return 'uploads/images'
  if (mimeType === 'application/pdf') return 'uploads/pdfs'
  if (mimeType === 'application/msword') return 'uploads/docs'
  if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return 'uploads/docs'
  if (mimeType === 'application/vnd.ms-excel') return 'uploads/excels'
  if (mimeType === 'application/openxmlformats-officedocument.spreadsheetml.sheet') return 'uploads/excels'
  if (mimeType === 'application/zip') return 'uploads/zips'
  return 'uploads/others'
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dynamicFolder = getFolderByItsMimeType(file.mimetype)
    //check if folder exists or create it
    if (!fs.existsSync(dynamicFolder)) {
      fs.mkdirSync(dynamicFolder, {recursive: true})
    }
    //save the file
    cb(null, dynamicFolder)
  },
  filename: function(req, file, cb) {
    const dynamicFolder = getFolderByItsMimeType(file.mimetype)
    const filePath = path.join(dynamicFolder, file.originalname)
    //check if the file exists
    if(fs.existsSync(filePath)) {
      return cb(new Error('File already exists'), false)
    }
    //save file
    cb(null, file.originalname)
  }
})

export const upload = multer({storage})