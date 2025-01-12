import mongoose from 'mongoose';
const { Schema } = mongoose;

const billsSchema = new Schema({
  billNumber: String,
  contractorId: String,
  s3detials: Object,
  locations: Array,
  totalAmount: Number,
});

const bills = mongoose.model('bills', billsSchema);
export default bills;