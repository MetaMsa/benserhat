import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function NewsMailSend(
  _clients: { email: string; name: string }[]
) {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || "",
  });

  const sentFrom = new Sender("MS_Agq6XW@benserhat.live", "benserhat");

  const uniqueClients = Array.from(
    new Map(_clients.map((c) => [c.email, c])).values()
  );

  const recipients = uniqueClients.map((c) => new Recipient(c.email));

  const personalization = _clients.map((client) => ({
    email: client.email,
    data: {
      name: client.name,
    },
  }));

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setBcc(recipients)
    .setSubject("Blog sitemizde bir güncelleme var")
    .setTemplateId("z86org8o95n4ew13")
    .setPersonalization(personalization);

  await mailerSend.email.send(emailParams);
}

export async function ReplyMailSend(
  _replyUserName,
  _reply,
  _clientMail,
  _clientUserName
) {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || "",
  });

  const sentFrom = new Sender("MS_Agq6XW@benserhat.live", "benserhat");

  const recipients = [new Recipient(_clientMail)];

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
