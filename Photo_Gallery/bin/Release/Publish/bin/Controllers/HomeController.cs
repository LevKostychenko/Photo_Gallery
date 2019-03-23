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


namespace Photo_Gallery.Controllers
{
    public class HomeController : Controller
    {

        PhotoSessionContext db = new PhotoSessionContext(); 

        public ActionResult Index()
        {

            
            return View(db.PhotoSessions);
        }

        [HttpPost]
        public ActionResult DataCheck(string adminlogin, string adminpassword)
        {
            if (adminlogin == "Kate_adm" && adminpassword == "1")     
                return View("Admin_Page");

            else
            {
                ViewBag.Text = "Неверно введены данные.";
                return View("Index");
            }

        }

        [HttpPost]
        public PartialViewResult PhotoSessionInfo(string description, string photoSessionName)
        {

            if (Request.IsAjaxRequest())
            {
                string fileName = "";
                string fileURL = "";
                if (Request.Files.Count >= 1)
                {

                    foreach (string file in Request.Files)
                    {
                        var upload = Request.Files[file];
                        if (upload != null && photoSessionName != "")
                        {
                            int size = upload.ContentLength;
                            fileName = System.IO.Path.GetFileName(upload.FileName);
                            try
                            {
                                fileURL = Server.MapPath("~/PhotoSessions/" + photoSessionName);
                                upload.SaveAs(fileURL + "/" + fileName);
                                string reposURL = fileURL; //find "~" and delete

                            }
                            catch
                            {

                            }
                            PhotoSession photoSession = new PhotoSession();
                            photoSession.PhotoReposURL = fileURL;
                            photoSession.PhotoSessionDescription = description;
                            photoSession.PhotoSessionName = photoSessionName;
                            db.Entry(photoSession).State = EntityState.Added;
                            db.SaveChanges();
                        }
                        else
                        {
                            ViewBag.Message = "NotEnoughAdminInfo";
                            return PartialView("~/Views/Shared/Info.cshtml");
                            //realisation and return
                        }
                    }
                  
                    ViewBag.Message = "SuccessUplod";
                    return PartialView("~/Views/Shared/Succsess");
                }
                else
                {
                    ViewBag.Message = "NotEnoughAdminInfo";
                    return PartialView("~/Views/Shared/Info.cshtml");
                }
            }
            return PartialView("~/Views/Shared/Error");
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
       
        
        public ActionResult AllPhotosView()
        {
            return View();
        }
       
        public PartialViewResult MailPost(string message, string email)
        {
            //message text validation
            return PartialView();
        }
        
       
    }
}