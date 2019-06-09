import {Order} from '../db/models'

export default class OrderController {
  constructor(){

  }
  async findAll(){
    try {
      let result = await Order.find()
        .lean()
        .populate('user','username')
        .populate('coffee','name price')

      return result;
    } catch (e) {
      throw e
    }
  }
  async findById(id){
    try {
      let result = await Order.findById(id)
        .populate('user','username')
        .populate('coffee','name')

      return result;
    } catch (e) {
      throw e
    }
  }
  async create(data){
    try {
      let result = await Order.create(data);
      return result;
    } catch (e) {
      throw e
    }
  }

  async update(id,data){
    try {
      const updateOpts = {new:true,runValidators:true}
      let result = await Order.findByIdAndUpdate(id,data,updateOpts);
      if(!result) throw {status:500, message:`Error updating`}
      return result;
    } catch (e) {
      throw e
    }
  }

  async delete(id){
    try {
      let result = await Order.findByIdAndDelete(id);
      if(!result) throw {status:500, message:`Error deleting`}
      return result;
    } catch (e) {
      throw e
    }
  }
}
