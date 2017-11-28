using ChurrasTrinca.Models;
using System.Data.Entity;

namespace ChurrasTrinca.Data
{
    public class ChurrasTrincaContext : DbContext
    {
        public ChurrasTrincaContext() : base("churrasTrinca") {}

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {            
            base.OnModelCreating(modelBuilder);            
        }

        public DbSet<Usuario> Usuario { get; set; }
        public DbSet<Churrasco> Churrasco { get; set; }
        public DbSet<Participante> Participante { get; set; }
    }
}