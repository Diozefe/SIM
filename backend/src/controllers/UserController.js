const firebase = require('firebase');
//const fadmin = require('firebase-admin');
const crypto = require('crypto');

const ENCRYPT_OPTIONS={
  algorithm:'aes256',
  secret:'',
  type:'hex',
  codification:'utf8'
}
function crypt(text){
  const cipher = crypto.createCipher(ENCRYPT_OPTIONS.algorithm,ENCRYPT_OPTIONS.secret);
  cipher.update(text,ENCRYPT_OPTIONS.codification);
  const crypted = cipher.final(ENCRYPT_OPTIONS.type);
  return crypted;
}
function decrypt(text){
  const decipher = crypto.createDecipher(ENCRYPT_OPTIONS.algorithm, ENCRYPT_OPTIONS.secret);
  decipher.update(text, ENCRYPT_OPTIONS.type);
  const decrypted = decipher.final(ENCRYPT_OPTIONS.codification);
  return decrypted;
}
module.exports={
  async index(req, res){
    /* const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');   */},
  async store(req, res){
    const refmodule = firebase.firestore().collection('grupoMETA/modules_model/module');
    const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');
    const { email, password} = req.body;
    try{
      //Create user in Autentication
      const userAuth = await firebase.auth().createUserWithEmailAndPassword(email, password);
      //Include uid user in Body
      req.body.id = userAuth.user.uid;
      //Create user in Firestore
      req.body.password = crypt(password);
      const Module = await refmodule.get();
      let ModuleData = [];
      await Module.forEach(val=>ModuleData.push({module:val.id,values:val.data()}));
      req.body.modules = ModuleData;
      await reference.doc(userAuth.user.uid).set(req.body);
      req.body.password = decrypt(req.body.password);
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
      let datauser = user.data();
      datauser.password = decrypt(datauser.password);
      return res.json(datauser);
    } catch (err) {
      return res.send(err.message)
    }

  },
  async update(req, res){
    /* const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');
    try {
      if(req.body.password){ 
        req.body.password=crypt(req.body.password); 
        fadmin.auth().updateUser(req.params.id)
      }
      await reference.doc(req.params.id).set(req.body,{merge:true});
      const user = await reference.doc(req.params.id).get();
      return res.json(user.data());
    } catch (err) {
      res.send(err.message);
    } */

  },
  async destroy(req, res){
    /* fadmin.initializeApp()
    const reference = firebase.firestore().collection('grupoMETA/faculdade/funcionario');
    await reference.doc(req.params.id).delete();
    await fadmin.auth().deleteUser(req.params.id);
    res.send(); */
  }

}