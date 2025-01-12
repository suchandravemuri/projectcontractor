import mongoose from 'mongoose';
const { Schema } = mongoose;

const billsSchema = new Schema({
  billNumber: String,
  contractorId: String,
  locations: Array,
  totalAmount: Number,
});

const bills = mongoose.model('bills', billsSchema);
export default bills;