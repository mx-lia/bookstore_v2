using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Domain.Entities
{
    public class Book
    {
        [Key]
        [MaxLength(13)]
        public string ISBN { get; set; }
        [Required]
        [MaxLength(100)]
        public string Title { get; set; }
        public string Description { get; set; }
        [Column(TypeName = "date")]
        public DateTime PublicationDate { get; set; }
        [Required]
        [MaxLength(15)]
        public string Language { get; set; }
        [Required]
        public string Format { get; set; }
        public int Pages { get; set; }
        public int AvailableQuantity { get; set; }
        [Column(TypeName = "decimal(6, 2)")]
        public float Price { get; set; }
        public BookCover BookCover { get; set; }
        public IList<BookAuthor> BookAuthors { get; set; }
        public IList<BookPublisher> BookPublishers { get; set; }
        public IList<BookGenre> BookGenres { get; set; }
        public IList<FavouriteBook> FavouriteBooks { get; set; }
        public IList<OrderDetail> OrderDetails { get; set; }
    }
}
