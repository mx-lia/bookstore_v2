using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Publisher
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<BookPublisher> BookPublishers { get; set; }
    }
}
