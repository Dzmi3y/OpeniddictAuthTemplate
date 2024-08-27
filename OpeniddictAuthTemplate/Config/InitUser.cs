namespace OAT.AuthApi.Config
{
    public class InitUser
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string RoleName { get; set; }

        public string NormalizedRoleName
        {
            get { return RoleName.ToUpper(); }
        }
    }
}
