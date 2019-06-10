import { mainStory } from 'storyboard';
import {Order} from '../db/models'
import CoffeeController from '../controllers/coffeeController';

export default class OrderController {
  constructor(){
    this.name='orderController'
  }
  async findAll(){
    try {
      let result = await Order.find()
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
      const {coffee:coffeeId,quantity} = data
      let result = await Order.create(data);
      const story = mainStory.child({
        src: this.name,
        title: `SET ORDER`,
        level: 'INFO',
      });
      story.info(this.name,`order ${quantity} units of coffee`)
      story.info(this.name,'Order',{attach:result.toObject()})
      story.close()
      const coffeeController = new CoffeeController();
      await coffeeController.consume(coffeeId,quantity)
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
