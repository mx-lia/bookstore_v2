using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CustomersAPI.Requests
{
    public class GetCustomerByIdRequest : IRequest<Customer> {}
    public class GetCustomerByIdRequestHandler : IRequestHandler<GetCustomerByIdRequest, Customer>
    {
        IDbContext context;
        ITokenService tokenService;
        public GetCustomerByIdRequestHandler(IDbContext dbContext, ITokenService tokenService)
        {
            context = dbContext;
            this.tokenService = tokenService;
        }

        public async Task<Customer> Handle(GetCustomerByIdRequest request, CancellationToken cancellationToken)
        {
            int customerId = tokenService.GetUserId();
            Customer customer = context.Customers.Where(customer => customer.Id == customerId).FirstOrDefault();
            return customer;
        }
    }
}
