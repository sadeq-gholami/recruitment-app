const RequestHandler = require('./RequestHandler');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
class UserSignup extends RequestHandler{
    constructor(){
        super()
    }
    get path() {
        return '/signup';
      }
  async appHandler(){
     
      try{
          await this.getController();
          this.router.post('/', async (req, res, next)=>{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            console.log(hashedPassword);
            console.log(this.controller);
            const user = {
                id: new mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                surname: req.body.surname,
                ssn: req.body.ssn,
                email: req.body.email,
                password: hashedPassword,
                role:req.body.role,
                username: req.body.username 
            }
            console.log(user);
            await this.controller.createUser(user);
            res.sendStatus(200);
          })
        
          

      }catch(err){
          console.log(err);
      }
  }
}

module.exports= UserSignup;