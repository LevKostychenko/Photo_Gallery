using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Photo_Gallery.Models
{
    public class PhotoSessionContext : DbContext
    {
        
        public DbSet<PhotoSession> PhotoSessions { get; set; }
      
    }
}