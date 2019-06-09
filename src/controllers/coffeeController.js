import {Coffee} from '../db/models'

export default class CoffeeController {
  constructor(){

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
  async create(data){
    try {
      let result = await Coffee.create(data);
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
