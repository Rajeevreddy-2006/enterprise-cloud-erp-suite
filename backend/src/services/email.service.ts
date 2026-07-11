// import nodemailer from "nodemailer";

// class EmailService {
//     private transporter =
//         nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: Number(process.env.EMAIL_PORT),
//             secure:false,
//             auth:{
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASSWORD
//             }
//         });
//     async sendEmail(
//         to:string,
//         subject:string,
//         html:string
//     ){
//         await this.transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             html
//         });
//     }
//     async sendInvitation(
//         email: string,
//         name: string,
//         link: string
//     ) {
//         await this.sendEmail(
//             email,
//             "Amdox ERP Invitation",
//             `<h2>
//             Welcome ${name}
//         </h2>
//         <p>
//             You have been invited
//             to Amdox ERP
//         </p>
//         <p>
//             Click below to activate
//             your account
//         </p>
//         <a href="${link}">
//             Create Account
//         </a>
//         <br/>
//         <br/>
//         <small>
//             This invitation expires
//             in 24 hours
//         </small>
//         `
//         );
//     }
// }

// export default new EmailService();
import nodemailer from "nodemailer";

class EmailService {

    private transporter = nodemailer.createTransport({

        host: process.env.EMAIL_HOST,

        port: Number(process.env.EMAIL_PORT),

        secure: false,

        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
        },

        tls: {
            rejectUnauthorized: false,
        },

    });

    async sendEmail(
        to: string,
        subject: string,
        html: string
    ) {

        await this.transporter.verify();

        console.log("SMTP Verified");

        await this.transporter.sendMail({

            from: `"Amdox ERP" <${process.env.EMAIL_USER}>`,

            to,

            subject,

            html,

        });

    }
}

export default new EmailService();