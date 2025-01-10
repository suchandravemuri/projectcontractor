import mongoose from 'mongoose';
const { Schema } = mongoose;


const entitySchema = new Schema({
  name: String, // String is shorthand for {type: String}
});

const Entity = mongoose.model('entity', entitySchema);
export default Entity;