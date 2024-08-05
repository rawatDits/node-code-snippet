import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import moment from 'moment';

const app = express();
const PORT = 3000;

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure the upload directory exists
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${moment().unix()}_${file.originalname}`;
    cb(null, fileName);
  }
});

// Create multer instance with storage configuration
const upload = multer({ storage });

// Route for single file upload
app.post('/upload-single', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (req.file) {
      res.json({ message: "Single file uploaded successfully", data: req.file.path });
    } else {
      res.status(400).send('No file uploaded.');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
});

// Route for multiple file upload
app.post('/upload-multiple', upload.array('files', 10), async (req: Request, res: Response) => {
  try {
    if (req.files) {
      // Cast req.files to an array of `Express.Multer.File`
      const files = req.files as Express.Multer.File[];
      const filenames = files.map(file => file.path);
      res.json({ message: "Multiple files uploaded successfully", data: filenames });
    } else {
      res.status(400).send('No files uploaded.');
    }
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).send('Error uploading files.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
