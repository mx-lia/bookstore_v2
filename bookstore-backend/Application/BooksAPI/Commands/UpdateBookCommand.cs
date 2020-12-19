using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.BooksAPI.Commands
{
    public class UpdateBookCommand : IRequest<Book>
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
    public class UpdateBookCommandHandler : IRequestHandler<UpdateBookCommand, Book>
    {
        private readonly IDbContext context;
        public UpdateBookCommandHandler(IDbContext dbContext)
        {
            context = dbContext;
        }
        public async Task<Book> Handle(UpdateBookCommand command, CancellationToken cancellationToken)
        {
            Book book = context.Books
                .Include(book => book.BookAuthors).ThenInclude(ba => ba.Author)
                .Include(book => book.BookPublishers).ThenInclude(bp => bp.Publisher)
                .Include(book => book.BookGenres).ThenInclude(bg => bg.Genre)
                .Include(book => book.BookCover)
                .FirstOrDefault(book => book.ISBN == command.ISBN);
            book.Title = command.Title;
            book.Description = command.Description;
            book.PublicationDate = command.PublicationDate;
            book.Language = command.Language;
            book.Format = command.Format;
            book.Pages = book.Pages;
            book.AvailableQuantity = command.AvailableQuantity;
            float.TryParse(command.Price.Replace('.', ','), out float price);
            book.Price = price;

            if (command.Cover != null)
            {
                byte[] image = Convert.FromBase64String(command.Cover.Substring(command.Cover.LastIndexOf(',') + 1));
                if (book.BookCover != null)
                {
                    book.BookCover.Image = image;
                }
                else
                {
                    book.BookCover = new BookCover { Image = image, BookISBN = book.ISBN };
                }
            }

            foreach (var item in book.BookAuthors.Where(bookAuthor => bookAuthor.BookISBN == command.ISBN && !command.Authors.Contains(bookAuthor.AuthorId)).ToList())
            {
                book.BookAuthors.Remove(item);
            }
            foreach (var item in command.Authors.Where(authorId => !book.BookAuthors.Any(ba => ba.AuthorId == authorId)))
            {
                context.BookAuthors.Add(new BookAuthor { BookISBN = command.ISBN, AuthorId = item });
            }

            foreach (var item in book.BookPublishers.Where(bookPublisher => bookPublisher.BookISBN == command.ISBN && !command.Publishers.Contains(bookPublisher.PublisherId)).ToList())
            {
                book.BookPublishers.Remove(item);
            }
            foreach (var item in command.Publishers.Where(publisherId => !book.BookPublishers.Any(bp => bp.PublisherId == publisherId)))
            {
                context.BookPublishers.Add(new BookPublisher { BookISBN = command.ISBN, PublisherId = item });
            }

            foreach (var item in book.BookGenres.Where(bookGenre => bookGenre.BookISBN == command.ISBN && !command.Genres.Contains(bookGenre.GenreId)).ToList())
            {
                book.BookGenres.Remove(item);
            }
            foreach (var item in command.Genres.Where(genreId => !book.BookGenres.Any(bg => bg.GenreId == genreId)))
            {
                context.BookGenres.Add(new BookGenre { BookISBN = command.ISBN, GenreId = item });
            }

            await context.SaveChangesAsync(cancellationToken);

            return book;
        }
    }
}
