//const Authentic =  require('../models/Authentic')
const firebase =  require('firebase')
module.exports ={
  async index(req, res){
    const { email , password } = req.body;
    //Verifica se existe
    await firebase.auth().signInWithEmailAndPassword(email, password).then(User=>{
      if(User.user.emailVerified===false){return res.json({status:"error",error:'Este usuário ainda não foi verificado!'})}
      user = {uid: User.user.uid, email: User.user.email}
      return res.json({status:"ok", user})
    }).catch(error=>{return res.json({status:"error",error:"Este usuário não existe, verifique e tente novamente."})})
  }

}