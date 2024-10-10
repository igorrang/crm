const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types');

class UploadAvatar {
    constructor() {
        //ou usar o basename ao inves do join
        this.URL = path.join(__dirname,'upload');
    }

    storage() {
        return multer.diskStorage({
            destination:(req,file,cb) =>{
                if(!fs.existsSync(this.URL)){
                    fs.mkdirSync(this.URL);
                }
                cb(null, this.URL);
            },
            filename:(req,file,cb) =>{
                const type = mime.extension(file.mimetype)
                cb(null, `${new Date().getTime()}.${type}`)
            }
        })
      
    }

    fileFilter() {
        return function(req, file, cb) {
            const type = mime.extension(file.mimetype);
            const conditions = ["png", "jpg", "jpeg"];
            if (conditions.includes(`${type}`)) {
                cb(null, true);
            } else {
                cb(null, false);
            }
        };
    }
    get config() {
        /*
          Essa configuração vai nos ajudar com 
          1 - A compor as configs do Multer como Middleware em nossas rotas
          2 - Não será um middleware global e sim para usos unicos e comportamentais
        */
        return {
          //Storage serve para compor a config do multer destination e filename
          storage: this.storage(),
          //FileFilter serve para validar o filtro de arquivos
          fileFilter: this.fileFilter(),
        };
      }
}

const uploadAvatar = new UploadAvatar();
module.exports = uploadAvatar;