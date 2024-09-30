const app = require("./app");
require('dotenv').config();

const port = process.env.PORT ;

console.log(process.env)
app.listen(port,  () => {
  console.log(`Server rodando perfeitamente na porta ${port}`);
});