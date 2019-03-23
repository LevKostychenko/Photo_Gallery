using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;



namespace Photo_Gallery.Models
{
    public class PhotoSession
    {
        public int Id { get; set; }

        public string PhotoReposURL { get; set; }

        public string PhotoSessionDescription { get; set; }

        public string PhotoSessionName { get; set; }


    }
}