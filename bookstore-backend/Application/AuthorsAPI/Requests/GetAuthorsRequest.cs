using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.AuthorAPI.Requests
{
    public class GetAuthorsRequest : IRequest<IEnumerable<Author>> { }
    public class GetAuthorsRequestHandler : IRequestHandler<GetAuthorsRequest, IEnumerable<Author>>
    {
        IDbContext context;
        public GetAuthorsRequestHandler(IDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<IEnumerable<Author>> Handle(GetAuthorsRequest request, CancellationToken cancellationToken)
        {
            var authors = await context.Authors.ToListAsync();
            return authors;
        }
    }
}
