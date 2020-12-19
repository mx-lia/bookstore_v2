namespace Application.Common.Interfaces
{
    public interface IHashService
    {
        public string GetHash(string input);
        public bool Verify(string candidate, string hashed);
    }
}
