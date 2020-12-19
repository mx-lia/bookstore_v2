using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.AuthorsAPI.Commands
{
    public class CreateAuthorCommand : IRequest<Author>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
    public class CreateAuthorCommandHandler : IRequestHandler<CreateAuthorCommand, Author>
    {
        private readonly IDbContext context;
        public CreateAuthorCommandHandler(IDbContext dbContext)
        {
            context = dbContext;
        }
        public async Task<Author> Handle(CreateAuthorCommand command, CancellationToken cancellationToken)
        {
            Author newAuthor = new Author { FirstName = command.FirstName, LastName = command.LastName };
            await context.Authors.AddAsync(newAuthor);
            await context.SaveChangesAsync(cancellationToken);
            return newAuthor;
        }
    }
}
