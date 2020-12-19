using Application.Common.Interfaces;
using Application.OrdersAPI.Dtos;
using Domain.Entities;
using MediatR;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.OrdersAPI.Commands
{
    public class CreateOrderCommand : IRequest<Order>
    {
        public Customer Customer { get; set; }
        public OrderBookDto[] Books { get; set; }
    }
    public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Order>
    {
        private readonly IDbContext context;
        ITokenService tokenService;
        public CreateOrderCommandHandler(IDbContext dbContext, ITokenService tokenService)
        {
            context = dbContext;
            this.tokenService = tokenService;
        }
        public async Task<Order> Handle(CreateOrderCommand command, CancellationToken cancellationToken)
        {
            int customerId = tokenService.GetUserId();
            Customer customer = context.Customers.Where(customer => customer.Id == customerId).FirstOrDefault();
            customer.FirstName = command.Customer.FirstName;
            customer.LastName = command.Customer.LastName;
            customer.Email = command.Customer.Email;
            customer.PostalCode = command.Customer.PostalCode;
            customer.Country = command.Customer.Country;
            customer.City = command.Customer.City;
            customer.Street = command.Customer.Street;
            customer.BuildingNo = command.Customer.BuildingNo;
            customer.FlatNo = command.Customer.FlatNo;
            customer.PhoneNumber = command.Customer.PhoneNumber;

            Order newOrder = new Order() { Date = DateTime.Now, CustomerId = customerId };
            context.Orders.Add(newOrder);
            foreach (OrderBookDto orderBookDto in command.Books)
            {
                OrderDetail orderDetail = new OrderDetail() { Amount = orderBookDto.Amount, Order = newOrder, BookISBN = orderBookDto.ISBN };
                context.OrderDetails.Add(orderDetail);
                Book book = context.Books.Where(book => book.ISBN == orderBookDto.ISBN).FirstOrDefault();
                book.AvailableQuantity -= orderBookDto.Amount;
            }
            await context.SaveChangesAsync(cancellationToken);
            return newOrder;
        }
    }
}
