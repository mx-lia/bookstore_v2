using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.OrdersAPI.Requests
{
    public class GetOrdersByCustomerIdRequest : IRequest<IEnumerable<Order>> { }
    public class GetOrdersByCustomerIdRequestHandler : IRequestHandler<GetOrdersByCustomerIdRequest, IEnumerable<Order>>
    {
        IDbContext context;
        ITokenService tokenService;
        public GetOrdersByCustomerIdRequestHandler(IDbContext dbContext, ITokenService tokenService)
        {
            context = dbContext;
            this.tokenService = tokenService;
        }

        public async Task<IEnumerable<Order>> Handle(GetOrdersByCustomerIdRequest request, CancellationToken cancellationToken)
        {
            int customerId = tokenService.GetUserId();
            var orders = await context.Orders
                .Include(order => order.OrderDetails)
                .ThenInclude(orderDetail => orderDetail.Book)
                .Where(order => order.CustomerId == customerId)
                .ToListAsync();
            return orders;
        }
    }
}
