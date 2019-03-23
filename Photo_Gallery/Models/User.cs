using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;


namespace Photo_Gallery.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Login { get; set; }

        public string Password{ get; set; }

    }
}