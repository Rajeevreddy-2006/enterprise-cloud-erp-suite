import emailService from "../services/email.service";

export async function safeSendEmail(to: string,subject: string,html: string) {
  try {
    await emailService.sendEmail(to,subject,html);
    console.log( `Email sent successfully: ${subject}` );
  } catch (error) {
    console.error( `Failed to send email: ${subject}`, error);
  }
}