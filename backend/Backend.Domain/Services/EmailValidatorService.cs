using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text.RegularExpressions;


namespace Backend.Domain.Services
{
    public class EmailValidatorService
    {

        public void SendEmailVerification(string emailsTo)
        {
            var message = PrepareteMessage(emailsTo, "Verificação de email", @"
            <!DOCTYPE html>
            <html lang=""pt-br"">
            <head>
                <meta charset=""UTF-8"">
                <meta name=""viewport"" content=""width=device-width, initial-scale=1.0"">
                <title>Exemplo de E-mail</title>
                <style>
                    /* Estilos globais */
                    body {
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f4;
                        padding: 20px;
                    }
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        background-color: #fff;
                        padding: 20px;
                        border-radius: 8px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }
                    h1, p {
                        margin-bottom: 20px;
                    }
                    .button {
                        display: inline-block;
                        background-color: #007bff;
                        color: #fff;
                        text-decoration: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                    }
                </style>
            </head>
            <body>
                <div class=""container"">
                    <h1>Olá!</h1>
                    <p>Este é um exemplo de e-mail com HTML e CSS.</p>
                    <p>
                        <a href=""#"" class=""button"">Botão de Exemplo</a>
                    </p>
                </div>
            </body>
            </html>
        ");

            SendEmailBySmtp(message);
        }

        private MailMessage PrepareteMessage(string email, string subject, string body)
        {
            var mail = new MailMessage();
            mail.From = new MailAddress("trilingo.verification@outlook.com");

            if (ValidateEmail(email))
            {
                mail.To.Add(email);
            }

            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            return mail;
        }

        public bool ValidateEmail(string email)
        {
            Regex expression = new Regex(@"\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}");
            if (expression.IsMatch(email))
                return true;

            return false;
        }
        private void SendEmailBySmtp(MailMessage message)
        {
            SmtpClient smtpClient = new SmtpClient("smtp.office365.com");
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            smtpClient.Timeout = 50000;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = new NetworkCredential("trilingo.verification@outlook.com", "trilingoEmail123");
            smtpClient.Send(message);
            smtpClient.Dispose();
        }

        

    }
}
