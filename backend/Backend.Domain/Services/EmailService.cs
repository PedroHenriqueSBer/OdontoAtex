using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Routing.Template;


namespace Backend.Domain.Services
{
    public class EmailService
    {
        public static void SendEmail(string To, string subject, string templatePath, List<ReplaceObjects> replaceObjects, NetworkCredential credential)
        {
            try
            {
                var mail = new MailMessage();
                mail.From = new MailAddress(credential.UserName);
                mail.To.Add(To);

                var body = File.ReadAllText(templatePath);

                foreach (var obj in replaceObjects)
                {
                    body = body.Replace(obj.Old, obj.New);
                }

                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;

                SmtpClient smtpClient = new SmtpClient("smtp.office365.com");
                smtpClient.Port = 587;
                smtpClient.EnableSsl = true;
                smtpClient.Timeout = 50000;
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = credential;
                smtpClient.Send(mail);
                smtpClient.Dispose();
            }
            catch (Exception ex)
            {
                
            }
        }
    }
    public class ReplaceObjects
    {
        public string Old {  get; set; }
        public string New {  get; set; }
    }

}