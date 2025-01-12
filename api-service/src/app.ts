import express from 'express';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { contractorRoutes } from './routes/contractor.routes';
import {locationEntityRoutes} from './routes/locationentity.routes'
import {workOrderRoutes} from './routes/workorder.routes';
import {generateBillRoutes} from './routes/generatebill.routes';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGO_STRING).then(() => {
  console.log('Connected to Mongoose successfully');
  }).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
});
// Use CORS correctly
app.use(cors());

// Use body-parser for JSON data
app.use(bodyParser.json());
app.use(express.json());

// Importing Routes
app.use('/api/contractors', contractorRoutes);
app.use('/api/locationentity', locationEntityRoutes);
app.use('/api/workorder', workOrderRoutes);
app.use('/api/billgeneration', generateBillRoutes);


// Set the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});
