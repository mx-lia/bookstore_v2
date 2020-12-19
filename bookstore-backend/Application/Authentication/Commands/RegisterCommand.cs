using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System.Linq;
using System.Security.Authentication;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Authentication.Commands
{
    public class RegisterCommand : IRequest<Customer>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Customer>
    {
        private readonly IDbContext context;
        private readonly IHashService hashService;
        public RegisterCommandHandler(IDbContext dbContext, IHashService hashService)
        {
            context = dbContext;
            this.hashService = hashService;
        }
        public async Task<Customer> Handle(RegisterCommand command, CancellationToken cancellationToken)
        {
            Customer customer = context.Customers.Where(customer => customer.Email == command.Email).FirstOrDefault();

            if (customer != null)
            {
                throw new InvalidCredentialException($"Email {command.Email} has already registered in the system!");
            }

            customer = new Customer()
            {
                FirstName = command.FirstName,
                LastName = command.LastName,
                Email = command.Email,
                Password = hashService.GetHash(command.Password)
            };

            context.Customers.Add(customer);
            await context.SaveChangesAsync(cancellationToken);

            return customer;
        }
    }
}
