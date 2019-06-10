import { mainStory } from 'storyboard';
import OrderController from '../controllers/orderController';
import AuthController from '../controllers/authController';
import CoffeeController from '../controllers/coffeeController';
const orderController = new OrderController();
const authController = new AuthController();
const coffeeController = new CoffeeController();

export default (app) =>{

  app.get('/api/orders', async(req,res,next)=>{
    try {
      let out = {};
      authController.checkAdmin(req.user)
      let result = await orderController.findAll();
      out={status:200,message:"Found",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

  app.get('/api/orders/:id', async(req,res,next)=>{
    try {
      let out = {};
      authController.checkAdmin(req.user)
      const id = req.params.id
      let result = await orderController.findById(id);
      out={status:200,message:"Found",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

  app.post('/api/orders/new', async(req,res,next)=>{
    try {
      let out = {}
      const {coffee:coffeeId,quantity} = req.body
      const user = req.user

      if(!coffeeId || !quantity)
        throw {status:400, message:'Bad request, missing required fields'}

      const conditions = {_id:coffeeId, stock:{$gte:quantity}}
      let coffee = await coffeeController.findOne(conditions);
      if(!coffee){
        throw {status:404, message:'ERROR SET ORDER -> OUT OF STOCK'}
      }

      const orderData={
        user:user.id,
        coffee:coffeeId,
        quantity,
        amount:quantity * coffee.price,
      }
      const result = await orderController.create(orderData)

      out={status:200,message:"Created",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

  app.post('/api/orders/:id', async(req,res,next)=>{
    try {
      let out = {};
      authController.checkAdmin(req.user)
      const id = req.params.id
      const data = req.body

      let result = await orderController.update(id,data)
      out={status:200,message:"Updated",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

  app.delete('/api/orders/:id', async(req,res,next)=>{
    try {
      let out = {};
      authController.checkAdmin(req.user)
      const id = req.params.id
      let result = await orderController.delete(id);
      out={status:200,message:"Deleted",data:result}
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

}
