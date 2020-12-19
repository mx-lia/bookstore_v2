using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace Application.GenresAPI.Commands
{
    public class CreateGenreCommand : IRequest<Genre>
    {
        public string Name { get; set; }
    }
    public class CreateGenreCommandHandler : IRequestHandler<CreateGenreCommand, Genre>
    {
        private readonly IDbContext context;
        public CreateGenreCommandHandler(IDbContext dbContext)
        {
            context = dbContext;
        }
        public async Task<Genre> Handle(CreateGenreCommand command, CancellationToken cancellationToken)
        {
            Genre newGenre = new Genre { Name = command.Name };
            await context.Genres.AddAsync(newGenre);
            await context.SaveChangesAsync(cancellationToken);
            return newGenre;
        }
    }
}
