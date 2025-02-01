import nodemailer from "nodemailer";


export async function sendEmail(to,subject,html){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
         auth: {
           user: "qalqasim9@gmail.com",
           pass: "xcvy xegl soxa tzqc",
         },
       });


       const info = await transporter.sendMail({
        from: '"qutiba alqasim 👻" <qalqasim9@gmail.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
      });
}

