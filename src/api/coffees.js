import CoffeeController from '../controllers/coffeeController';
import AuthController from '../controllers/authController';
const coffeeController = new CoffeeController();
const authController = new AuthController();

export default (app) =>{

  app.get('/api/coffees', async(req,res,next)=>{
    try {
      let out = {};
      let result = await coffeeController.findAll();
      out={status:200,message:"Found",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

  app.get('/api/coffees/:id', async(req,res,next)=>{
    try {
      let out = {};
      const id = req.params.id
      let result = await coffeeController.findById(id);
      out={status:200,message:"Found",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

  app.post('/api/coffees/new', async(req,res,next)=>{
    try {
      let out = {};
      authController.checkAdmin(req.user)
      const data = req.body;
      const result = await coffeeController.create(data);
      out={status:200,message:"Created",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

  app.post('/api/coffees/:id', async(req,res,next)=>{
    try {
      let out = {};
      authController.checkAdmin(req.user)
      const id = req.params.id
      const data = req.body

      let result = await coffeeController.update(id,data)
      out={status:200,message:"Updated",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

  app.delete('/api/coffees/:id', async(req,res,next)=>{
    try {
      let out = {};
      authController.checkAdmin(req.user)
      const id = req.params.id
      let result = await coffeeController.delete(id);
      out={status:200,message:"Deleted",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

}
