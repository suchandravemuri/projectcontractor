import mongoose from 'mongoose';
const { Schema } = mongoose;
const STATE_READY = 1;
const STATE_COMPPLTED = 2;
const locationSchema = new Schema({
  entity_id: String, // String is shorthand for {type: String}
  location_name: String,
  state : Number,
  work_orders: Array,
  completed_by: String,
});

const Location = mongoose.model('location', locationSchema);
export default Location;
