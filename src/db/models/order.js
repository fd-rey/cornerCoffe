import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
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
    required: true
  },
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
