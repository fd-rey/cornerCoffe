import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  coffee: { type: mongoose.Schema.Types.ObjectId, ref: 'Coffee' },
  amount: {
    type: mongoose.Decimal128,
  },
  quantity: {
    type:   Number,
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
