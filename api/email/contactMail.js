import {sendMail} from './emailConfiguration'

const validation =(req,res)=>{
    const {to,subject,text} = req.body;
try{
if(!to) throw 'to email id is empty'
if(!subject) throw 'to email subject is empty'
if(!text) throw 'to email text body is empty'

return true;

}
catch(e){

res.status(404).send(e);

}


}


export const contactMail = (arg)=>{
try{
if(!arg.req) throw 'request parameters not found'
if(!arg.res) throw 'response parameters not found'



if(validation(arg.req,arg.res)){
    const {to,subject,text} = arg.req.body;
sendMail(arg.res,{to,subject,text})
 
}




}catch(err){
    console.log(err)
}
}