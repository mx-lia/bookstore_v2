using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.PublishersAPI.Commands
{
    public class CreatePublisherCommand : IRequest<Publisher>
    {
        public string Name { get; set; }
    }
    public class CreatePublisherCommandHandler : IRequestHandler<CreatePublisherCommand, Publisher>
    {
        private readonly IDbContext context;
        public CreatePublisherCommandHandler(IDbContext dbContext)
        {
            context = dbContext;
        }
        public async Task<Publisher> Handle(CreatePublisherCommand command, CancellationToken cancellationToken)
        {
            Publisher newPublisher = new Publisher { Name = command.Name };
            await context.Publishers.AddAsync(newPublisher);
            await context.SaveChangesAsync(cancellationToken);
            return newPublisher;
        }
    }
}
