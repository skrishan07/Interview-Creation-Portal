const nodemailer = require('nodemailer');
// const { getMaxListeners } = require('./models/candidate');

function mailer(candidate, interview, dt){
    let fromMail = 'faker.send12@gmail.com';
    let toMail = candidate.email;
    let subject = 'Interview Scheduled.';
    
    let text = `Hi, ${candidate.name} your interview for faker is scheduled on ${dt} from ${interview.startTime} to ${interview.endTime}.`;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: fromMail ,
            pass: 'Qwertyuiop@123'
        }
    });

    let mailOptions = {
        from: fromMail,
        to: toMail,
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, (err, res) => {
        console.log(mailOptions);
        if(err){
            console.log(err);
        }else{

            console.log(res);
        }
    });
}

module.exports = mailer;
