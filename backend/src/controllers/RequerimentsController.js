const firebase = require('firebase');
const moment = require('moment');
module.exports={
  async index(req, res){
    const { id } = req.params;
    const { page=1 , limit=10} = req.query;


  },
  async store(req, res){
    //GTI adiciona turma
    const official = firebase.firestore().collection('grupoMETA/faculdade/funcionario');
    //const requeriments = firebase.firestore().collection('grupoMETA/requerimento');
    const { id } = req.params;
    try {
      const officialData = await official.doc(id).get();
      req.body.dateCreate = moment().localeData();
      req.body.log = {
        createBy:officialData.data().id,
        dateCreate:req.body.dateCreate,
        name:officialData.data().name,
        sectorCreation:officialData.data().sector
      }
      return res.send(req.body);
    } catch (error) {
      return res.send(error.message);
    }

  },
  async show(req, res){
  },
  async update(req, res){
  },
  async destroy(req, res){
  },
}