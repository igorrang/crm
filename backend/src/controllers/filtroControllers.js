const uploadAvatar = require('/Users/igorrangelkonvictus/crm/backend/src/middleware/upload/avatar.js');
console.log(uploadAvatar.storage)

class filtroControllers {
    uploadAvatar(req, res) {
        const storage = uploadAvatar.storage();
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
  
  module.exports = new filtroControllers();