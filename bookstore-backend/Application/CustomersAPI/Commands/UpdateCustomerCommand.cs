using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CustomersAPI.Commands
{
    public class UpdateCustomerCommand : IRequest<Customer>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string BuildingNo { get; set; }
        public string FlatNo { get; set; }
        public string PhoneNumber { get; set; }
    }
    public class UpdateCustomerCommandHandler : IRequestHandler<UpdateCustomerCommand, Customer>
    {
        private readonly IDbContext context;
        public UpdateCustomerCommandHandler(IDbContext dbContext)
        {
            context = dbContext;
        }
        public async Task<Customer> Handle(UpdateCustomerCommand command, CancellationToken cancellationToken)
        {
            Customer customer = context.Customers.Where(customer => customer.Email == command.Email).FirstOrDefault();
            customer.FirstName = command.FirstName;
            customer.LastName = command.LastName;
            customer.Email = command.Email;
            customer.PostalCode = command.PostalCode;
            customer.Country = command.Country;
            customer.City = command.City;
            customer.Street = command.Street;
            customer.BuildingNo = command.BuildingNo;
            customer.FlatNo = command.FlatNo;
            customer.PhoneNumber = customer.PhoneNumber;

            await context.SaveChangesAsync(cancellationToken);
            return customer;
        }
    }
}
