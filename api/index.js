var express = require('express')
var bodyParser = require('body-parser')

var app = express()
import {contactMail} from './email/contactMail'

import {suggestionMail} from './email/suggestionMail'
 
// parse various different custom JSON types as JSON
app.use(bodyParser.json())
//{ type: 'application/*+json' }

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
const getPost= (url,callback)=>{
    app.post(url, urlencodedParser, function (req, res,next) {
        if (!req.body) return res.sendStatus(400)
        callback({req,res,next});
      //console.log(process.env.appName)
     
        
      })
       

}

getPost('/contactus',contactMail)
getPost('/suggestion',suggestionMail)

// POST /login gets urlencoded bodies


 



module.exports = {
path : '/api',
handler:app
}