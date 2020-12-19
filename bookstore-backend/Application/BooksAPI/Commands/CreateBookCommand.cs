using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.BooksAPI.Commands
{
    public class CreateBookCommand : IRequest<Book>
    {
        public string ISBN { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime PublicationDate { get; set; }
        public string Language { get; set; }
        public string Format { get; set; }
        public int Pages { get; set; }
        public int AvailableQuantity { get; set; }
        public string Price { get; set; }
        public int[] Authors { get; set; }
        public int[] Publishers { get; set; }
        public int[] Genres { get; set; }
        public string Cover { get; set; }
    }
    public class CreateBookCommandHandler : IRequestHandler<CreateBookCommand, Book>
    {
        private readonly IDbContext context;
        public CreateBookCommandHandler(IDbContext dbContext)
        {
            context = dbContext;
        }
        public async Task<Book> Handle(CreateBookCommand command, CancellationToken cancellationToken)
        {
            if(command.Cover != "")
            {
                context.BookCovers.Add(new BookCover { BookISBN = command.ISBN, Image = Convert.FromBase64String(command.Cover.Substring(command.Cover.LastIndexOf(',') + 1)) });
            }
            foreach(var item in command.Authors)
            {
                context.BookAuthors.Add(new BookAuthor { BookISBN = command.ISBN, AuthorId = item });
            }
            foreach (var item in command.Publishers)
            {
                context.BookPublishers.Add(new BookPublisher { BookISBN = command.ISBN, PublisherId = item });
            }
            foreach (var item in command.Genres)
            {
                context.BookGenres.Add(new BookGenre { BookISBN = command.ISBN, GenreId = item });
            }
            float.TryParse(command.Price.Replace('.', ','), out float price);
            Book book = new Book()
            {
                ISBN = command.ISBN,
                Title = command.Title,
                Description = command.Description,
                PublicationDate = command.PublicationDate,
                Language = command.Language,
                Format = command.Format,
                Pages = command.Pages,
                AvailableQuantity = command.AvailableQuantity,
                Price = price
            };
            context.Books.Add(book);
            await context.SaveChangesAsync(cancellationToken);
            return book;
        }
    }
}
