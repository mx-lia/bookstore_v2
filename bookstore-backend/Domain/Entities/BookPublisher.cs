using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class BookPublisher
    {
        public string BookISBN { get; set; }
        [JsonIgnore]
        public Book Book { get; set; }
        public int PublisherId { get; set; }
        [JsonIgnore]
        public Publisher Publisher { get; set; }
    }
}
