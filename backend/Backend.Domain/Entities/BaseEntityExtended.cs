using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Entities
{
    public class BaseEntityExtended : BaseEntity
    {
        public User? CreatedBy { get; set; }
        public User? UpdatedBy { get; set; }
        public Guid CreatedById { get; set; }
        public Guid? UpdatedById { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }

        public BaseEntityExtended()
        {
            CreatedById = Guid.Empty;
            CreatedAt = DateTime.UtcNow;
        }
    }
}
