import "core-js/stable";
import "regenerator-runtime/runtime";

import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import registerRoutes from './api'
import _ from 'lodash'
import { mainStory} from 'storyboard';
import 'storyboard-preset-console';

import initDB from './db'
import AuthController from './controllers/authController';
const authController = new AuthController();

const app = express()
const namespace = 'server'
//config
const PORT = 8080;
const DB_URL  = 'mongodb://mongo:27017/cornerCoffee'

let run = async() => {
  try {
    mainStory.info(namespace,'Starting...')
    // parse application/json
    app.use(bodyParser.json())
    // jwt verification middleware
    app.use(
      jwt({ secret: 'this_should_be_an_environment_variable'}).unless({path: ['/api/login/']})
    )
    app.use( authController.checkUser().unless({path: ['/api/login/']}) )

    // routes
    registerRoutes(app)

    // Error handling middleware
    app.use(function (e, req, res, next) {
      // Send the error as response
      let out;
      if(e.status && e.message && e.status != 500)
        // Controlled error
        out = {status:e.status,error:e.message};
      else{
        // Internal error
        out = {status:500, error:'Server error'}
        if(e.name){
          switch (e.name) {
            case 'ValidationError':
              let badFields = _.keys(e.errors)
              out = {status:400, error:`Validation error, missing or wrong fields: ${badFields}`}
              break;
            default:
          }
        }
      }
      mainStory.error(namespace,'Error',{attach:e})
      res.status(out.status)
      res.json(out);
    });

    await initDB(DB_URL, mainStory)
    app.listen(PORT);
    mainStory.info(namespace,`API listening on port ${PORT}`)

  } catch (e) {
    mainStory.fatal(namespace,'Crash: ',{attach:e});
  }
}
run();



export default app;
