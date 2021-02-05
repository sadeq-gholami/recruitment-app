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
     
          await this.getController().catch(err=>{console.log(err)});
          this.router.post('/', async (req, res, next)=>{
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = {
                id: new mongoose.Types.ObjectId(),
                firstname: req.body.firstname,
                surname: req.body.surname,
                ssn: req.body.ssn,
                email: req.body.email,
                password: hashedPassword,
                role: "applicant",
                username: req.body.username 
            }
            await this.controller.createUser(user).then(async result =>{
                await this.controller.createReadyTable(user.id)
                .catch(err=>{console.log(err)});
                res.status(200).json({result:result});
            })
            .catch(err=>{
                res.status(400).json({err:err});
            });
          })

          
  }
}

module.exports= UserSignup;