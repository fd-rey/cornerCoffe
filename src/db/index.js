import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import _ from 'lodash'

import models from './models'
import populateData from './data'

const saltRounds = 10;
const init = async (dbUrl) => {
  try {

    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.on('connected', () => {
      console.log('Connection Established')
    })

    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useCreateIndex: true
    });
    console.log('Connected to mongoDB with mongoose!!');

    // Clean DB
    let promises = _.map(models,(model)=>model.deleteMany({}));
    await Promise.all(promises);
    console.log(`Cleaned db`);

    // Populate
    promises = _.map(populateData.users, async (user)=>{
      let {username,password,role} = user;
      // encrypt password
      let hash = await bcrypt.hash(password,saltRounds);
      // save the user
      const userInstance = new models.User({
        username,
        password:hash,
        role
      });
      await userInstance.save();
    });

    await Promise.all(promises);

    console.log('DB ready');

  } catch (e) {
    throw e
  }
}

export default init
