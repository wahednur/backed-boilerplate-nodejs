import envVars from "app/config/env";
import ApiError from "app/errors/ApiError";
import ejs from "ejs";
import nodemailer from "nodemailer";
import path from "path";
const transporter = nodemailer.createTransport({
  secure: true,
  auth: {
    user: envVars.SMTP_USER,
    pass: envVars.SMTP_PASS,
  },
  port: Number(envVars.SMTP_PORT),
  host: envVars.SMTP_HOST,
});

interface SendEmailOptions {
  to: string;
  subject: string;
  templateName: string;
  templateData?: Record<string, any>;
  attachments?: {
    filename: string;
    content: Buffer | string;
    contentType: string;
  }[];
}

export const sendEmail = async ({
  to,
  subject,
  templateName,
  templateData,
  attachments,
}: SendEmailOptions) => {
  try {
    const templatePath = path.join(__dirname, `templates/${templateName}.ejs`);
    const html = await ejs.renderFile(templatePath, templateData);
    const info = await transporter.sendMail({
      from: envVars.SMTP_FROM,
      to: to,
      subject: subject,
      html: html,
      attachments: attachments?.map((attach) => ({
        filename: attach.filename,
        content: attach.content,
        contentType: attach.contentType,
      })),
    });
    console.log(`\u2709\uFE0F Email sent to ${to}: ${info.messageId}`);
  } catch (err: any) {
    console.log("Email sending error", err);
    throw new ApiError(401, "Email sending error");
  }
};
