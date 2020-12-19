using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.BooksAPI.Commands
{
    public class DeleteBookCommand : IRequest<Book>
    {
        public string ISBN { get; set; }
    }
    public class DeleteBookCommandHandler : IRequestHandler<DeleteBookCommand, Book>
    {
        private readonly IDbContext context;
        public DeleteBookCommandHandler(IDbContext dbContext)
        {
            context = dbContext;
        }
        public async Task<Book> Handle(DeleteBookCommand command, CancellationToken cancellationToken)
        {
            Book book = context.Books.Find(command.ISBN);
            context.Books.Remove(book);
            await context.SaveChangesAsync(cancellationToken);
            return book;
        }
    }
}
