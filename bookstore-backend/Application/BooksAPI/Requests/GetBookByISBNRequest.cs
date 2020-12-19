using Application.BooksAPI.Dtos;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.BooksAPI.Requests
{
    public class GetBookByISBNRequest : IRequest<BookDto>
    {
        public string ISBN { get; set; }
    }
    public class GetBookByISBNRequestHandler : IRequestHandler<GetBookByISBNRequest, BookDto>
    {
        IDbContext context;
        public GetBookByISBNRequestHandler(IDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<BookDto> Handle(GetBookByISBNRequest request, CancellationToken cancellationToken)
        {
            Book book = context.Books
                .Include(book => book.BookAuthors).ThenInclude(ba => ba.Author)
                .Include(book => book.BookPublishers).ThenInclude(bp => bp.Publisher)
                .Include(book => book.BookGenres).ThenInclude(bg => bg.Genre)
                .Include(book => book.BookCover)
                .FirstOrDefault(book => book.ISBN == request.ISBN);
            BookDto bookDto = new BookDto
            {
                ISBN = book.ISBN,
                Title = book.Title,
                Description = book.Description,
                PublicationDate = book.PublicationDate.ToString("MM/dd/yyyy"),
                Language = book.Language,
                Format = book.Format,
                Pages = book.Pages,
                AvailableQuantity = book.AvailableQuantity,
                Price = book.Price,
                BookCover = book.BookCover,
                BookAuthors = book.BookAuthors,
                BookPublishers = book.BookPublishers,
                BookGenres = book.BookGenres,
                FavouriteBooks = book.FavouriteBooks,
                OrderDetails = book.OrderDetails
            };
            return bookDto;
        }
    }
}
