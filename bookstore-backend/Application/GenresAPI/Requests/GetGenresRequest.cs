using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.GenresAPI.Requests
{
    public class GetGenresRequest : IRequest<IEnumerable<Genre>> { }
    public class GetGenresRequestHandler : IRequestHandler<GetGenresRequest, IEnumerable<Genre>>
    {
        IDbContext context;
        public GetGenresRequestHandler(IDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<IEnumerable<Genre>> Handle(GetGenresRequest request, CancellationToken cancellationToken)
        {
            var genres = await context.Genres.ToListAsync();
            return genres;
        }
    }
}
