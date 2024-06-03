using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication.InputModels
{
    public class SendCodeEmailInputModel
    {
        public string To { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
    }
}
