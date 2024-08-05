// server.ts
import express, { Request, Response } from 'express';
import multer from 'multer';
import { S3 } from 'aws-sdk';
import path from 'path';

// Create an instance of Express
const app = express();
const port = 3000;

// Configure AWS S3
const s3 = new S3({
  region: process.env.region,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_KEY,
  },
});

// Set up storage for multer
const storage = multer.memoryStorage(); // Use memory storage for S3 uploads

// Create multer instance with storage configuration
const upload = multer({ storage });

// Upload function to S3
const uploadToS3 = (file: Express.Multer.File) => {
  const params = {
    Bucket: 'uploadfilenode',
    Key: path.basename(file.originalname),
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  return s3.upload(params).promise();
};

// Route for single file upload to S3
app.post('/upload-single', upload.single('file'), async (req: Request, res: Response) => {
  try {
    if (req.file) {
      const result = await uploadToS3(req.file);
      res.send(`Single file uploaded successfully: ${result.Location}`);
    } else {
      res.status(400).send('No file uploaded.');
    }
  } catch (error) {
    res.status(500).send('Error uploading file to S3.');
  }
});

// Route for multiple file upload to S3
app.post('/upload-multiple', upload.array('files', 10), async (req: Request, res: Response) => {
  try {
    if (req.files) {
      const files = req.files as Express.Multer.File[];
      const uploadPromises = files.map(file => uploadToS3(file));
      const results = await Promise.all(uploadPromises);
      const fileUrls = results.map(result => result.Location);
      res.send(`Multiple files uploaded successfully: ${fileUrls.join(', ')}`);
    } else {
      res.status(400).send('No files uploaded.');
    }
  } catch (error) {
    console.error('Error uploading files to S3:', error);
    res.status(500).send('Error uploading files to S3.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
