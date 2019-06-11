import AuthController from '../controllers/authController';
const authController = new AuthController();

export default (app) =>{

  // Find the user and return a json web token
  app.post('/api/login', async(req,res,next)=>{
    try {
      let out = {};
      let {username,password} = req.body;
      // create token
      let token = await authController.authenticate({username,password});

      out = {status:200,data:{token}};
      res.status(out.status)
      res.json(out);
    } catch (e) {
      next(e);
    }
  });

}
