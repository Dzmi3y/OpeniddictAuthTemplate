namespace OAT.AuthApi.Contracts.Responses
{
    public class UserDataResponse
    {
        public required string Id { get; set; }
        public string? Name { get; set; } 
        public string? Role { get; set; }
    }
}
