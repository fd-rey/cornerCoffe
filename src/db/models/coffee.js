import mongoose from 'mongoose';

const coffeeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  intensity: {
    type: Number,
  },
  price: {
    type: mongoose.Decimal128,
  },
  stock: {
    type: Number,
  },
});

const Coffee = mongoose.model('Coffee', coffeeSchema);

export default Coffee;
