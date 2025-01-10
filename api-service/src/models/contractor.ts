import mongoose from 'mongoose';
const { Schema } = mongoose;

const contractorSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  phone: String,
});

const Contractor = mongoose.model('contractor', contractorSchema);
export default Contractor;