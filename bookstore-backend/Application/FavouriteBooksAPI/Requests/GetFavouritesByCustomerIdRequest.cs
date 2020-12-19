using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.FavouriteBooksAPI.Requests
{
    public class GetFavouritesByCustomerIdRequest : IRequest<IEnumerable<FavouriteBook>>
    {
        public int CustomerId { get; set; }
    }
    public class GetFavouritesByCustomerIdRequestHandler : IRequestHandler<GetFavouritesByCustomerIdRequest, IEnumerable<FavouriteBook>>
    {
        IDbContext context;
        ITokenService tokenService;
        public GetFavouritesByCustomerIdRequestHandler(IDbContext dbContext, ITokenService tokenService)
        {
            context = dbContext;
            this.tokenService = tokenService;
        }

        public async Task<IEnumerable<FavouriteBook>> Handle(GetFavouritesByCustomerIdRequest request, CancellationToken cancellationToken)
        {
            int customerId = tokenService.GetUserId();
            var favourites = await context.FavouriteBooks.Where(favourite => favourite.CustomerId == customerId).ToListAsync();
            return favourites;
        }
    }
}
