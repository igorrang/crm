var nodemailer = require('nodemailer')

let transport: any = null 

export const  sendEmail = async (userEmail: string, validationToken:string ) => {
     const user = String(process.env.NODEMAILER_USER)
     const pass = String(process.env.NODEMAILER_PASSWORD)
    
     if (!transport){
        transport = nodemailer.createTransport({
            host: '',
            port:'',
            service: 'gmail',
            auth: {
                user: String(process.env.NODEMAILER_USER),
                pass: String (process.env.NODEMAILER_PASSWORD)
            }
        })

     }

     const status = await transport.verify()

     var mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: userEmail,
        subject: 'Validation Token',
        html:
        '<a href=' +
        process.env.BASE_URL +
        '/verify/' +
        validationToken +
        '> Verificar email </a>'
        
     }

     transport.sendMail(mailOptions,(error:any,info:any) => {
        if(error){
            console.log(error)
            return false
        }else{
            console.log('Email sent: ' + info.response)
            return true
        }
     })
}