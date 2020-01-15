const firebase = require('firebase');
module.exports={
  async store(req, res){
    
    const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');

    const { email, password} = req.body;
    //.collection(): Acessa uma coleção dentro do firestore
    //.doc(): acessa um documento dentro de uma collection
    //.set(): adiciona dados dentro de um documento
    try{
      //Cria usuário no Autentication
      const userAuth = await firebase.auth().createUserWithEmailAndPassword(email, password);
      //Inclui no Body o uid do usuário
      req.body.id = userAuth.user.uid;

      //Cria usuário no Firestore
      await reference.doc(userAuth.user.uid).set(req.body);
      return res.json(req.body);

    }catch(err){
      return res.send(err.message)
    }  
  },
  async index(req, res){},
  async show(req, res){},
  async update(req, res){},
  async destroy(req, res){},

}