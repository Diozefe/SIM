//const Authentic =  require('../models/Authentic')
const firebase =  require('firebase')
module.exports ={
  async index(req, res){
    const { email , password } = req.body;
    console.log(req.body)
    //Verifica se existe
    await firebase.auth().signInWithEmailAndPassword(email, password).then(User=>{
        /* if(User.user.emailVerified===false){
          firebase.auth().sendSignInLinkToEmail(email).then(e=>{
            return res.json({
              status:"confirm-mail",
              error:'Este usuário ainda não foi verificado!'
            })

          })
        } */
      firebase.firestore().collection('grupoMETA/faculdade/funcionario').get().then(snap=>{
        snap.forEach(doc => {
          return console.log(doc.id, '==', doc.data())
        });  
          //return res.json({status:"ok", snap})
        }).catch(err=>{
          console.log({erro: err.message})
        })
    }).catch(error=>{return res.json({
      status:"error",
      error:"Este usuário não existe, verifique e tente novamente.",
      message: error.message
    })})
  }

}