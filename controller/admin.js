const nodemailer = require('nodemailer');
require('dotenv').config();

const monMdp = process.env.mdp;
const monMail = process.env.mail;


exports.getHome = (req, res, next)=>{
    res.render('home')
}
exports.postHome = (req, res, next)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: monMail,
          pass: monMdp
        }
      });
    
      const mailOptions = {
        from: req.body.email,
        to: 'bouderga.abdessamade@gmail.com',
        subject: `Message de ${req.body.name}: ${req.body.message}`,
        text: req.body.message
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res.send('Erreur lors de l\'envoi du message');
        } else {
          console.log('Message envoyé: ' + info.response + ' contenue du message : ' + req.body.email);
          res.redirect('/');        }
      });
}
