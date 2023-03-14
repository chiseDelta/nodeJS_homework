import EmailTemplates from "email-templates";
import nodemailer, { Transporter } from "nodemailer";
import path from "path";

import { configs } from "../configs";
import { allTemplates } from "../constants";
import { EEmailActions } from "../enums";

class EmailService {
  private transporter: Transporter;
  private templateParser;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.NO_REPLY_EMAIL,
        pass: configs.NO_REPLY_PASSWORD,
      },
    });

    this.templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "src", "views"),
        options: {
          extension: "hbs",
        },
      },
      juice: true,
      juiceResources: {
        webResources: {
          relativeTo: path.join(process.cwd(), "src", "views", "css"),
        },
      },
    });
  }

  public async sendMail(email: string, emailAction: EEmailActions) {
    const templateInfo = allTemplates[emailAction];

    const html = await this.templateParser.render(templateInfo.templateName);

    return this.transporter.sendMail({
      from: "No reply",
      to: email,
      subject: templateInfo.subject,
      html,
    });
  }
}

export const emailService = new EmailService();
