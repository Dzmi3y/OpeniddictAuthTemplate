using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace OAT.Database
{
    internal class DesignTimeAppDbContextFactory : IDesignTimeDbContextFactory<DefaultDbContext>
    {
        public DefaultDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DefaultDbContext>();
            ConfigurationBuilder builder = new ConfigurationBuilder();
            builder.SetBasePath(Directory.GetCurrentDirectory());
            builder.AddJsonFile("appsettings.json");
            IConfigurationRoot config = builder.Build();


            string connectionString = config.GetConnectionString("DefaultConnectionString");

            Console.WriteLine($"connectionString:{connectionString}");

            optionsBuilder.UseSqlServer(connectionString);

            return new DefaultDbContext(optionsBuilder.Options);
        }
    }

}
