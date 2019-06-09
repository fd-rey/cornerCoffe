import mongoose from 'mongoose';

const coffeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  intensity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
});

const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;
