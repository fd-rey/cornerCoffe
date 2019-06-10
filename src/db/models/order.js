import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user:   {
    type: mongoose.Schema.Types.ObjectId, ref: 'User',
    required: true
   },
  coffee: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Coffee',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  quantity: {
    type:   Number,
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
  delete ret.user
  delete ret.coffee
  ret.userId = doc.user.toString()
  ret.coffeeId = doc.coffee.toString()
  return ret
}
const Order = mongoose.model('Order', schema);

export default Order;
