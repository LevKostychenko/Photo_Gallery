using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Photo_Gallery.Models;
using System.Data.Entity;
using System.Threading.Tasks;

namespace Photo_Gallery.Controllers
{
    public class AdminController : Controller
    {

        
        PhotoSessionContext db = new PhotoSessionContext();
        UserContext usersDB = new UserContext();
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }

        [ValidateAntiForgeryToken]
        [HttpPost]
        public ActionResult DataCheck(string adminlogin, string adminpassword)
        {
            User user = null;
           user = usersDB.Users.FirstOrDefault(p => p.Password == adminpassword);
           if (user == null)
            { 
                return View("Error");
            }
           //User user = (User)usersDB.Users.Where(e => e.Password == adminpassword);
            if (user.Login == adminlogin)
            {
                return View("Admin_Page");
            }
                


            return View("Error");

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

    }
}