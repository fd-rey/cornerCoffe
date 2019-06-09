
import mongoose from 'mongoose'

import _ from 'lodash'
import AuthController from '../controllers/authController';
const authController = new AuthController();

import * as models from './models'
import populateData from './data'

const init = async (dbUrl) => {
  try {

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('connected', () => {
      console.log('Connection Established')
    })

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('Connected to mongoDB with mongoose!!');

    // Clean DB
    let promises = _.map(models,(model)=>model.deleteMany({}));
    await Promise.all(promises);
    console.log(`Cleaned db`);

    // Populate
    promises = _.map(populateData.users, async (user)=>{
      let {username,password,role} = user;
      let hash = await authController.encrypt(password);
      await models.User.create({
        username,
        password:hash,
        role
      });

    });

    await Promise.all(promises);

    console.log('DB ready');

  } catch (e) {
    throw e
  }
}

export default init
