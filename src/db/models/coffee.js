import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  intensity: {
    type: Number,
    required: true,
    validate : {
      validator : Number.isInteger
    }
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    validate : {
      validator : Number.isInteger
    }
  },
});
if (!schema.options.toObject) schema.options.toObject = {};
schema.options.toObject.transform = function (doc, ret, options) {
  delete ret._id
  delete ret.__v
  return ret
}
const Coffee = mongoose.model('Coffee', schema);

export default Coffee;
