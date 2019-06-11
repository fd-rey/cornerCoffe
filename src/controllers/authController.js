import "core-js/stable";
import "regenerator-runtime/runtime";
import unless from 'express-unless';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {User} from '../db/models'

export default class AuthController {
  constructor(){
    this.secret = 'this_should_be_an_environment_variable';
    this.saltRounds = 10;
  }

  async encrypt(password){
    try {
       const hash = bcrypt.hash(password,this.saltRounds);
       return hash;
    } catch (e) {
      throw e
    }
  }

  async authenticate(login){
    try {
      const {username,password} = login;
      const user = await User.findOne({username});
      if(!user)
        throw {status:401, message:`Wrong username ${username}`};
      if(!user.role || (user.role != 'admin' && user.role != 'customer'))
        throw {status:500, message: `Bad configured user`}
      const match = await bcrypt.compare(password,user.password);
      if(!match)
        throw {status:401, message:`Incorrect password for user ${username}`};

      // generate token for client
      const tokenPayload = {
        id: user.id,
        role: user.role
      }
      let token = jwt.sign(tokenPayload, this.secret);
      return token;

    } catch (e) {
      throw e
    }
  }

  async isUsersEmpty(){
    try {
      let count = await User.countDocuments();
      return count == 0
    } catch (e) {
      throw (e)
    }
  }

  checkAdmin(user){
    if(!user || !user.role)
      throw {status:400, message:`Bad request`}
    if(user.role !== 'admin')
      throw {status:403, message:`Forbidden`}
  }

  checkUser(){
    let mid = async(req,res,next) => {
      try {
        let user = await User.findById(req.user.id);
        if(!user)
          throw {status:401, message:`Invalid user token`}
        next()
      } catch (e) {
        next(e)
      }
    }
    mid.unless = unless;
    return mid;

  }
}
