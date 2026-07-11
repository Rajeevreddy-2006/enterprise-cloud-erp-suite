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

        console.log(`Email sent to ${to}`);
    }

    async sendInvitation(
        email: string,
        name: string,
        link: string
    ) {

        const html = `
            <h2>Welcome ${name}</h2>

            <p>
                You have been invited to <b>Amdox ERP</b>.
            </p>

            <p>
                Click the button below to activate your account.
            </p>

            <p>
                <a
                    href="${link}"
                    style="
                        display:inline-block;
                        padding:12px 20px;
                        background:#2563eb;
                        color:white;
                        text-decoration:none;
                        border-radius:6px;
                    "
                >
                    Activate Account
                </a>
            </p>

            <p>
                Or copy this link into your browser:
            </p>

            <p>
                ${link}
            </p>

            <small>
                This invitation expires in 24 hours.
            </small>
        `;

        await this.sendEmail(
            email,
            "Amdox ERP Invitation",
            html
        );
    }
}

export default new EmailService();