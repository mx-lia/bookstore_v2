using Application.BooksAPI.Dtos;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.BooksAPI.Requests
{
    public class GetBooksRequest : IRequest<BooksDto>
    {
        public int Limit { get; set; }
        public int Page { get; set; }
        public string Genre { get; set; }
        public string Keyword { get; set; }
        public OrderByOptions? OrderBy { get; set; }
        public PriceOptions? Price { get; set; }
        public AvailabilityOptions? Availability { get; set; }
    }
    public class GetBooksRequestHandler : IRequestHandler<GetBooksRequest, BooksDto>
    {
        IDbContext context;
        public GetBooksRequestHandler(IDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<BooksDto> Handle(GetBooksRequest request, CancellationToken cancellationToken)
        {
            IEnumerable<Book> books = context.Books
                .Include(book => book.BookAuthors).ThenInclude(ba => ba.Author)
                .Include(book => book.BookPublishers)
                .Include(book => book.BookGenres).ThenInclude(bg => bg.Genre)
                .Include(book => book.BookCover);

            int booksCount = books.ToList().Count;

            if (request.Keyword != null)
            {
                books = books.Where(book => (book.Title + string.Join("", book.BookAuthors.Select(ba => ba.Author.FirstName + ba.Author.LastName))).ToLower().Contains(request.Keyword.ToLower()));
            }

            books = books.Skip(request.Limit * (request.Page - 1)).Take(request.Limit);

            if (request.Genre != null)
            {
                books = books.Where(book => book.BookGenres.Select(bookGenre => bookGenre.Genre.Name).Contains(request.Genre));
            }

            switch (request.Price)
            {
                case PriceOptions.low:
                    {
                        books = books.Where(book => book.Price < 15);
                    }
                    break;
                case PriceOptions.med:
                    {
                        books = books.Where(book => book.Price >= 15 && book.Price <= 30);
                    }
                    break;
                case PriceOptions.high:
                    {
                        books = books.Where(book => book.Price > 30);
                    }
                    break;
                default: break;
            }

            switch (request.Availability)
            {
                case AvailabilityOptions.in_stock:
                    {
                        books = books.Where(book => book.AvailableQuantity > 0);
                    }
                    break;
                case AvailabilityOptions.out_of_stock:
                    {
                        books = books.Where(book => book.AvailableQuantity == 0);
                    }
                    break;
                default: break;
            }

            switch (request.OrderBy)
            {
                case OrderByOptions.price_high_low:
                    {
                        books = books.OrderByDescending(book => book.Price);
                    }
                    break;
                case OrderByOptions.price_low_high:
                    {
                        books = books.OrderBy(book => book.Price);
                    }
                    break;
                case OrderByOptions.pubdate_new_old:
                    {
                        books = books.OrderByDescending(book => book.PublicationDate);
                    }
                    break;
                case OrderByOptions.pubdate_old_new:
                    {
                        books = books.OrderBy(book => book.PublicationDate);
                    }
                    break;
                default: break;
            }

            IEnumerable<BookDto> bookDtos = books.Select(book => new BookDto
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
            });

            return new BooksDto { Books = bookDtos, Count = booksCount, Pages = (booksCount / request.Limit) + 1 };
        }
    }
}
