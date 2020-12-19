using System;
using System.Collections.Generic;
using System.Text;

namespace Application.BooksAPI.Dtos
{
    public class BooksCountDto
    {
        public int All { get; set; }
        public int Available { get; set; }
        public int NotAvailable { get; set; }
    }
}
