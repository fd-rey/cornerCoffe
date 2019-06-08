import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import registerRoutes from './api'

import initDB from './db'

const app = express()

//config
const PORT = 8080;
const DB_URL  = 'mongodb://mongo:27017/cornerCoffee'

let run = async() => {
  try {
    // parse application/json
    app.use(bodyParser.json())

    // Error handling middleware
    app.use(function (e, req, res, next) {
      // Send the error as response
      let out;
      if(e.status && e.message && e.status != 500)
        // Controlled error
        out = {status:e.status,error:e.message};
      else{
        // Internal error
        console.error(e);
        out = {status:500, error:'Server error'}
      }
      res.status(out.status)
      res.json(out);
    });

    await initDB(DB_URL);


    // ready
    app.listen(PORT);
    console.log(`API listening on port ${PORT}`);

  } catch (e) {
    console.log(e);
  }
}
run();



export default app;
