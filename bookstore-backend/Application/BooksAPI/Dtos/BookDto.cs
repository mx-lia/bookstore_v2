using Domain.Entities;
using System;
using System.Collections.Generic;

namespace Application.BooksAPI.Dtos
{
    public class BookDto
    {
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string PublicationDate { get; set; }
        public string Language { get; set; }
        public string Format { get; set; }
        public int Pages { get; set; }
        public int AvailableQuantity { get; set; }
        public float Price { get; set; }
        public BookCover BookCover { get; set; }
        public IList<BookAuthor> BookAuthors { get; set; }
        public IList<BookPublisher> BookPublishers { get; set; }
        public IList<BookGenre> BookGenres { get; set; }
        public IList<FavouriteBook> FavouriteBooks { get; set; }
        public IList<OrderDetail> OrderDetails { get; set; }
    }
}
