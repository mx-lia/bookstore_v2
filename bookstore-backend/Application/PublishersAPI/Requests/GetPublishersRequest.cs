using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.PublishersAPI.Requests
{
    public class GetPublishersRequest : IRequest<IEnumerable<Publisher>> { }
    public class GetPublishersRequestHandler : IRequestHandler<GetPublishersRequest, IEnumerable<Publisher>>
    {
        IDbContext context;
        public GetPublishersRequestHandler(IDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<IEnumerable<Publisher>> Handle(GetPublishersRequest request, CancellationToken cancellationToken)
        {
            var publishers = await context.Publishers.ToListAsync();
            return publishers;
        }
    }
}
