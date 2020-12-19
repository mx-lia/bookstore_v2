using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FavouriteBooksAPI.Commands
{
    public class CreateFavouriteBookCommand : IRequest<FavouriteBook>
    {
        public string ISBN { get; set; }
    }
    public class CreateFavouriteBookCommandHandler : IRequestHandler<CreateFavouriteBookCommand, FavouriteBook>
    {
        private readonly IDbContext context;
        ITokenService tokenService;
        public CreateFavouriteBookCommandHandler(IDbContext dbContext, ITokenService tokenService)
        {
            context = dbContext;
            this.tokenService = tokenService;
        }
        public async Task<FavouriteBook> Handle(CreateFavouriteBookCommand command, CancellationToken cancellationToken)
        {
            FavouriteBook favouriteBook = new FavouriteBook() { BookISBN = command.ISBN, CustomerId = tokenService.GetUserId() };
            context.FavouriteBooks.Add(favouriteBook);
            await context.SaveChangesAsync(cancellationToken);
            return favouriteBook;
        }
    }
}
