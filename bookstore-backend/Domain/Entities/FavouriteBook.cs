using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class FavouriteBook
    {
        public string BookISBN { get; set; }
        public Book Book { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
    }
}
