using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Photo_Gallery.Models;
using System.Data.Entity;
using System.IO;
using System.Threading.Tasks;
using System.Net.Mail;


namespace Photo_Gallery.Controllers
{
    public class HomeController : Controller
    {

        PhotoSessionContext db = new PhotoSessionContext(); 

        public ActionResult Index()
        {
          
            return View("Index", db.PhotoSessions);
        }

      

        public async Task<ActionResult> ConcretePhotoSession(int? sessionId)
        {
            if(sessionId != null)
            {
                PhotoSession photoSession = await db.PhotoSessions.FirstOrDefaultAsync(p => p.Id == sessionId);
                if (photoSession != null)
                {
                    return View(photoSession);
                }
            }



            //notFound
            return View();
        }
       
        
        public ActionResult AllPhotoSessionsView()
        {

            return PartialView(db.PhotoSessions);
        }
       
        public ActionResult MailPost(string message, string email, string number, string name)
        {
            if (message == "" || email == "")
            {
                //create erorr message
                Console.WriteLine("");
                return PartialView("NotEnoughData");
            }

           
            MailMessage msg = new MailMessage();
            msg.From  = new MailAddress(email);
            msg.To.Add("Lev.vladimirovich2000@gmail.com");
            msg.Subject = "Photosession";
            msg.IsBodyHtml = true;
            msg.Body = MessageCreator(message, number, name, email);
            
            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Send(msg);
            

                //message text validation
            return PartialView();
        }

        public void MailSender()
        {

        }        
       
        private string MessageCreator (string mes, string number, string name, string email)
        {
            return string.Format($"<p>Постеитель сайта {name} оставил сообщение: </p>" +
                $"<br/> <h3>{mes}</h3>" +
                $"<br/> Номер телефона: <b>{number}</b>"+
                $"<br/> Email: <b>{email}</b>");
        }
    }
}