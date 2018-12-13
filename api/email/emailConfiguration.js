var nodemailer = require('nodemailer');
require('dotenv').config()

var transporter = nodemailer.createTransport({
    service: process.env.mailService || 'gmail',
    secure:false,
    port:25,
    auth: {
      user: process.env.mailUserName || 'abaait32@gmail.com',
      pass: process.env.mailPassword || "7890123bd"
    }
  });


  export  const sendMail = (res,arg)=>{
        try{
        if(!arg.to) throw 'send mail to address not found'
        if(!arg.subject) throw 'send mail subject not found'
        if(!arg.text) throw 'send mail text not found'

            transporter.sendMail({
                from: process.env.mailUserName || 'abaait32@gmail.com',
                to:arg.to,
                subject:arg.subject,
                text:arg.text
            }, function(error, info){
                if (error) {
                   
                    res.status(404).send('your email id invalid');
                
                } else {
                    res.status(200).send('successfully send Email');
                    
                }
            });



        }
        catch(err){
        console.error(err)
        }


        }
  
