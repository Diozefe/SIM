const firebase = require('firebase');
const CreateUser = require('../models/CreateUser')
module.exports={
  async store(req, res){
    const { name, lastname, cpf, date, email, password, phone, sector, office } = req.body;
    CreateUser.name=name;
    CreateUser.lastname=lastname;
    CreateUser.cpf=cpf;
    CreateUser.date=date;
    CreateUser.email=email;
    CreateUser.password=password;
    CreateUser.phone=phone;
    CreateUser.sector=sector;
    CreateUser.office=office;
    //.collection(): Acessa uma coleção dentro do firestore
    //.doc(): acessa um documento dentro de uma collection
    //.set(): adiciona dados dentro de um documento
    await firebase.auth().createUserWithEmailAndPassword(email, password).then(User=>{
      CreateUser.id=User.user.uid;
      createUserFirestore(CreateUser);
    }).catch((err)=>{
      return res.json({status:"error",
      error:"Ocorreu um erro ao criar o novo usuário no Autentication.",
      message: err.message})
    });
    function createUserFirestore(data){
      firebase.firestore().collection('grupoMETA/faculdade/funcionario')
      .add(data)
        .then(()=>{
          return res.json({status:"ok", user:data})
        }).catch((err)=>{
          return res.json({status:"error",
          error:"Ocorreu um erro ao criar o novo usuário no Firestore.",
          message: err.message})
        }) 
    }
  }
}