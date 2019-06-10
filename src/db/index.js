import mongoose from 'mongoose'
import { mainStory } from 'storyboard';

import _ from 'lodash'
import AuthController from '../controllers/authController';
const authController = new AuthController();

import * as models from './models'
import populateData from './data'

const namespace = 'db'

const init = async (dbUrl) => {
  try {

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    mainStory.info(namespace,'Connected');

    // Clean DB
    let promises = _.map(models,(model)=>model.deleteMany({}));
    await Promise.all(promises);
    mainStory.info(namespace,'Cleaning completed');

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
    mainStory.info(namespace,'Population completed');

    await Promise.all(promises);

    mainStory.info(namespace,'Ready');

  } catch (e) {
    throw e
  }
}

export default init
