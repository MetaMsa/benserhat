import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function NewsMailSend(
  _clients: { email: string; name: string }[]
) {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || "",
  });

  const sentFrom = new Sender("MS_VJYnSt@benserhat.com", "benserhat");

  const uniqueClients = Array.from(
    new Map(_clients.map((c) => [c.email, c])).values()
  );

  for (const client of uniqueClients) {
    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo([new Recipient(client.email)])
      .setSubject("Blog sitemizde bir güncelleme var")
      .setTemplateId("z86org8o95n4ew13")
      .setPersonalization([
      {
        email: client.email,
        data: { name: client.name },
      },
    ]);

    await mailerSend.email.send(emailParams);
  }
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

  const sentFrom = new Sender("MS_VJYnSt@benserhat.com", "benserhat");

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
