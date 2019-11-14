const firebase =  require('firebase')
module.exports ={
  async index(req, res){
    const { email } = req.body;
    //Sends a password reset link to the user's email.
    await firebase.auth().sendPasswordResetEmail(email).then(()=>{
      return res.json({status:'ok'})
    })
  }
}