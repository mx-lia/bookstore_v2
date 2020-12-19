using Domain.Entities;

namespace Application.Common.Interfaces
{
    public interface ITokenService
    {
        int GetUserId();
        string GetUserName();
        string AppendSecurityToken(Customer customer);
    }
}
