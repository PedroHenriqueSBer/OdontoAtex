using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Domain.Entities
{
    public class RefreshToken : BaseEntityExtended
    {
        public string Token { get; set; } = "";
        public DateTime ExpirationDate { get; set; }

        # region Ignored Properties
        [NotMapped]
        [Obsolete("RefreshToken doesn't implement this property.", true)]
        public new DateTime? UpdatedAt { get; set; }

        [NotMapped]
        [Obsolete("RefreshToken doesn't implement this property.", true)]
        public new bool? Disabled { get; set; }

        [NotMapped]
        [Obsolete("RefreshToken doesn't implement this property.", true)]
        public new DateTime? DisabledAt { get; set; }
        #endregion
    }
}
