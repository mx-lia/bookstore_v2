using Application.BooksAPI.Dtos;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.BooksAPI.Requests
{
    public class GetBooksCountRequest : IRequest<BooksCountDto> { }
    public class GetBooksCountRequestHandler : IRequestHandler<GetBooksCountRequest, BooksCountDto>
    {
        IDbContext context;
        public GetBooksCountRequestHandler(IDbContext dbContext)
        {
            context = dbContext;
        }

        public async Task<BooksCountDto> Handle(GetBooksCountRequest request, CancellationToken cancellationToken)
        {
            var books = await context.Books.ToListAsync();
            return new BooksCountDto { All = books.Count, Available = books.Where(book => book.AvailableQuantity > 0).Count(), NotAvailable = books.Where(book => book.AvailableQuantity == 0).Count() };
        }
    }
}
