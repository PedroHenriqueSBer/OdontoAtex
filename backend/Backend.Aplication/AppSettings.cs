﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Aplication
{
    public class AppSettings
    {
        public string AUTH_SECRET { get; set; } = "9417cfcbfde35c0a6acfc5592c732c95183501652e5d74b259be5a8841be2703";
        public NetworkCredential CREDENTIAL { get; set; } = new NetworkCredential("trilingo.verification@outlook.com", "trilingoEmail123");
        public string URL { get; set; } = "http://localhost:3000";
    }
}
