const filtroConstrollers = require('../controllers/filtroConstrollers');

class FirstController {
    UploadAvatar(req, res) {
      if (req.file) {
        return res.json({
          response: req.file,
        });
      }
  
      res.status(409);
      return res.json({
        response: `Não é um tipo de arquivo válido`,
      });
    }
  }
  
  module.exports = FirstController;