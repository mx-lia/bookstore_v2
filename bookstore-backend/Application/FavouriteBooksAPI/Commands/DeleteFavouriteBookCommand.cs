using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FavouriteBooksAPI.Commands
{
    public class DeleteFavouriteBookCommand : IRequest<FavouriteBook>
    {
        public string ISBN { get; set; }
    }
    public class DeleteFavouriteBookCommandHandler : IRequestHandler<DeleteFavouriteBookCommand, FavouriteBook>
    {
        private readonly IDbContext context;
        ITokenService tokenService;
        public DeleteFavouriteBookCommandHandler(IDbContext dbContext, ITokenService tokenService)
        {
            context = dbContext;
            this.tokenService = tokenService;
        }
        public async Task<FavouriteBook> Handle(DeleteFavouriteBookCommand command, CancellationToken cancellationToken)
        {
            int customerId = tokenService.GetUserId();
            FavouriteBook favouriteBook = context.FavouriteBooks.Where(favourite => favourite.CustomerId == customerId && favourite.BookISBN == command.ISBN).FirstOrDefault();
            context.FavouriteBooks.Remove(favouriteBook);
            await context.SaveChangesAsync(cancellationToken);
            return favouriteBook;
        }
    }
}
