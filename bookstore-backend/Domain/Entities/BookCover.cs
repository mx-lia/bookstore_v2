using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class BookCover
    {
        public int Id { get; set; }
        [Required]
        public byte[] Image { get; set; }
        public string BookISBN { get; set; }
        public Book Book { get; set; }
    }
}
