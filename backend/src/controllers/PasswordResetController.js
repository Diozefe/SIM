const firebase =  require('firebase');
module.exports = {
  async show(req, res){
    try {
      await firebase.auth().sendPasswordResetEmail(req.body.email);
      return res.send();
    } catch (err) {
      return res.send(err.message)
    }
  }
}