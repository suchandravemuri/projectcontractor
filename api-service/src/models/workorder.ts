import mongoose from 'mongoose';
const { Schema } = mongoose;

const workOrderSchema = new Schema({
  contractor: String,
  locations: Array,
  payment_terms : Number,
  due_date: Date,
});

const workOrder = mongoose.model('workorder', workOrderSchema);
export default workOrder;