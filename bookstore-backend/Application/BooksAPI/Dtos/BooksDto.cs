using Domain.Entities;
using System.Collections.Generic;

namespace Application.BooksAPI.Dtos
{
    public class BooksDto
    {
        public IEnumerable<BookDto> Books { get; set; }
        public int Count { get; set; }
        public int Pages { get; set; }
    }
}
