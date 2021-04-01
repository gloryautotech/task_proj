var nodemailer = require('nodemailer');
let sendEmail = (req, res) => {

  var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: '180013107012@adit.ac.in',
          pass: '7567561179vidhi'
        }
      });
    
    var mailOptions = {
        from: '180013107012@adit.ac.in',
        to: req.body.emailid,
        subject: req.body.subject,
        text: req.body.text        
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            res.send('email send')
          console.log('Email sent: ' + info.response);
        }
      })
}

module.exports = {
    sendEmail: sendEmail
}