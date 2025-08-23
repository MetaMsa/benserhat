import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function ReplyMailSend(_replyUserName, _reply, _clientMail, _clientUserName) {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || "",
  });

  const sentFrom = new Sender("MS_Agq6XW@benserhat.live", "benserhat");

  const recipients = [new Recipient(_clientMail, _clientUserName)];

  const personalization = [
    {
      email: _clientMail,
      data: {
        name: _clientUserName,
        reply_text: _reply,
        account_name: _replyUserName,
      },
    },
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject("Yorumunuza yanıt verildi")
    .setTemplateId("neqvygme08j40p7w")
    .setPersonalization(personalization);

  await mailerSend.email.send(emailParams);
}
