import { EEmailActions } from "../enums";

export const allTemplates = {
  [EEmailActions.WELCOME]: {
    subject: "Welcome to the Club Buddy!",
    templateName: "register",
  },
  [EEmailActions.FORGOT_PASSWORD]: {
    subject: "Just follow all steps and everything will be ok!",
    templateName: "forgotPassword",
  },
};
