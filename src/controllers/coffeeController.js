import { mainStory } from 'storyboard';
import {Coffee} from '../db/models'

export default class CoffeeController {
  constructor(){
    this.name='coffeeController'
  }
  async findAll(){
    try {
      let result = await Coffee.find();
      return result;
    } catch (e) {
      throw e
    }
  }
  async findById(id){
    try {
      let result = await Coffee.findById(id);
      return result;
    } catch (e) {
      throw e
    }
  }
  async findOne(conditions){
    try {
      let result = await Coffee.findOne(conditions);
      return result;
    } catch (e) {
      throw e
    }
  }
  async create(data){
    try {
      let result = await Coffee.create(data);
      mainStory.info(this.name,`SET COFFEE`,{attach:result.toObject()})
      return result;
    } catch (e) {
      throw e
    }
  }

  async update(id,data){
    try {
      const updateOpts = {new:true,runValidators:true}
      let result = await Coffee.findByIdAndUpdate(id,data,updateOpts);
      if(!result) throw {status:500, message:`Error updating`}
      return result;
    } catch (e) {
      throw e
    }
  }

  async consume(id,quantity){
    try {
      let coffee = await Coffee.findById(id);
      coffee.stock -= quantity;
      await coffee.save()
      const story = mainStory.child({
        src: this.name,
        title: `UPDATE COFFEE ${id}`,
        level: 'INFO',
      });
      story.info(this.name,`${quantity} units of coffee consumed`)
      story.info(this.name,'Coffee',{attach:coffee.toObject()})
      story.close()
    } catch (e) {
      throw e
    }
  }

  async delete(id){
    try {
      let result = await Coffee.findByIdAndDelete(id);
      if(!result) throw {status:500, message:`Error deleting`}
      return result;
    } catch (e) {
      throw e
    }
  }
}
