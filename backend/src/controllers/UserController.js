const firebase = require('firebase');
const fadmin = require('firebase-admin');
module.exports={
  async index(req, res){
    /* const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');   */},
  async store(req, res){
    const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');
    const { email, password} = req.body;
    //.collection(): Acessa uma coleção dentro do firestore
    //.doc(): acessa um documento dentro de uma collection
    //.set(): adiciona dados dentro de um documento rocketseat
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
  async show(req, res){
    const { email, password } = req.body;
    const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');
    
    try {
      const userAuth = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = await reference.doc(userAuth.user.uid).get();
      return res.json(user.data())
    } catch (err) {
      return res.send(err.message)
    }

  },
  async update(req, res){
    const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');
    try {
      await reference.doc(req.params.id).set(req.body,{merge:true});
      const user = await reference.doc(req.params.id).get();
      return res.json(user.data());
    } catch (err) {
      res.send(err.message);
    }

  },
  async destroy(req, res){
    fadmin.initializeApp()
    const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');
    await reference.doc(req.params.id).delete();
    await fadmin.auth().deleteUser(req.params.id);
    res.send();
  }

}