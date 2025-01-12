import mongoose from 'mongoose';
const { Schema } = mongoose;

const billsNumberSchema = new Schema({
    current_number: Number
});

const billnumber = mongoose.model('billnumber', billsNumberSchema);
export default billnumber;