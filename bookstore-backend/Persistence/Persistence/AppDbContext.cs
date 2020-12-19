using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Domain.Common;
using Domain.Entities;
using Application.Common.Interfaces;
using Persistence.Configurations;

namespace Persistence
{
    public class AppDbContext : DbContext, IDbContext
    {
        private readonly ITokenService _tokenService;
        private readonly IHashService _hashService;

        public DbSet<Author> Authors { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<BookAuthor> BookAuthors { get; set; }
        public DbSet<BookCover> BookCovers { get; set; }
        public DbSet<BookGenre> BookGenres { get; set; }
        public DbSet<BookPublisher> BookPublishers { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<FavouriteBook> FavouriteBooks { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Publisher> Publishers { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        /// <summary>
        /// https://github.com/aspnet/EntityFrameworkCore/issues/7533
        /// </summary>
        protected AppDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public AppDbContext(
            DbContextOptions<AppDbContext> options,
            ITokenService tokenService, IHashService hashService)
            : base(options)
        {
            _tokenService = tokenService;
            _hashService = hashService;
            Database.EnsureCreated();
        }

        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {
            SetModifyUserAndDate();
            return base.SaveChangesAsync(cancellationToken);
        }

        public override int SaveChanges()
        {
            SetModifyUserAndDate();
            return base.SaveChanges();
        }

        private void SetModifyUserAndDate()
        {
            ChangeTracker.DetectChanges();

            var modifiedUser = _tokenService.GetUserName().ToString();
            var modifiedDate = DateTime.UtcNow;

            foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedBy = modifiedUser;
                    entry.Entity.Created = modifiedDate;

                    entry.Entity.LastModifiedBy = modifiedUser;
                    entry.Entity.LastModified = modifiedDate;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.LastModifiedBy = modifiedUser;
                    entry.Entity.LastModified = modifiedDate;

                    entry.Property(x => x.CreatedBy).IsModified = false;
                    entry.Property(x => x.Created).IsModified = false;
                }
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly)
                .ApplyAuditableEntityConfiguration();

            SetUtcDateTime(modelBuilder);
            RestrictCascadeDelete(modelBuilder);

            modelBuilder.Entity<Book>()
                .HasOne<BookCover>(s => s.BookCover)
                .WithOne(ad => ad.Book)
                .HasForeignKey<BookCover>(ad => ad.BookISBN)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Order>()
                .HasOne<Customer>(s => s.Customer)
                .WithMany(g => g.Orders)
                .HasForeignKey(s => s.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<OrderDetail>()
                .HasOne<Order>(s => s.Order)
                .WithMany(g => g.OrderDetails)
                .HasForeignKey(s => s.OrderId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<OrderDetail>()
                .HasOne<Book>(s => s.Book)
                .WithMany(g => g.OrderDetails)
                .HasForeignKey(s => s.BookISBN)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<BookAuthor>().HasKey(sc => new { sc.BookISBN, sc.AuthorId });
            modelBuilder.Entity<BookGenre>().HasKey(sc => new { sc.BookISBN, sc.GenreId });
            modelBuilder.Entity<BookPublisher>().HasKey(sc => new { sc.BookISBN, sc.PublisherId });
            modelBuilder.Entity<FavouriteBook>().HasKey(sc => new { sc.BookISBN, sc.CustomerId });

            modelBuilder.Entity<BookAuthor>()
                .HasOne(s => s.Book)
                .WithMany(g => g.BookAuthors)
                .HasForeignKey(sc => sc.BookISBN)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<BookAuthor>()
                .HasOne(s => s.Author)
                .WithMany(g => g.BookAuthors)
                .HasForeignKey(sc => sc.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<BookGenre>()
                .HasOne(s => s.Book)
                .WithMany(g => g.BookGenres)
                .HasForeignKey(sc => sc.BookISBN)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<BookGenre>()
                .HasOne(s => s.Genre)
                .WithMany(g => g.BookGenres)
                .HasForeignKey(sc => sc.GenreId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<BookPublisher>()
                .HasOne(s => s.Book)
                .WithMany(g => g.BookPublishers)
                .HasForeignKey(sc => sc.BookISBN)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<BookPublisher>()
                .HasOne(s => s.Publisher)
                .WithMany(g => g.BookPublishers)
                .HasForeignKey(sc => sc.PublisherId)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<FavouriteBook>()
                .HasOne(s => s.Book)
                .WithMany(g => g.FavouriteBooks)
                .HasForeignKey(sc => sc.BookISBN)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<FavouriteBook>()
                .HasOne(s => s.Customer)
                .WithMany(g => g.FavouriteBooks)
                .HasForeignKey(sc => sc.CustomerId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Customer>().HasData(new Customer { Id = 1, Role = 4, FirstName = "Annmarie", LastName = "Janes", Email = "ajanes8@deviantart.com", Password = _hashService.GetHash("Pa$$w0rd") });

            modelBuilder.Entity<Author>().HasData(new Author { Id = 1, FirstName = "Fredrik", LastName = "Backman" });
            modelBuilder.Entity<Author>().HasData(new Author { Id = 2, FirstName = "Douglas", LastName = "Stuart" });
            modelBuilder.Entity<Author>().HasData(new Author { Id = 3, FirstName = "Walter", LastName = "Tevis" });
            modelBuilder.Entity<Author>().HasData(new Author { Id = 4, FirstName = "George", LastName = "Orwell" });
            modelBuilder.Entity<Author>().HasData(new Author { Id = 5, FirstName = "Philip", LastName = "Pullman" });
            modelBuilder.Entity<Author>().HasData(new Author { Id = 6, FirstName = "Robert", LastName = "Galbraith" });
            modelBuilder.Entity<Author>().HasData(new Author { Id = 7, FirstName = "Graham", LastName = "Norton" });
            modelBuilder.Entity<Author>().HasData(new Author { Id = 8, FirstName = "Andre", LastName = "Aciman" });
            modelBuilder.Entity<Author>().HasData(new Author { Id = 9, FirstName = "Tracy", LastName = "Chevalier" });
            modelBuilder.Entity<Author>().HasData(new Author { Id = 10, FirstName = "Haruki", LastName = "Murakami" });

            modelBuilder.Entity<Publisher>().HasData(new Publisher { Id = 1, Name = "HODDER&STOUGHTON" });
            modelBuilder.Entity<Publisher>().HasData(new Publisher { Id = 2, Name = "Pan MacMillan" });
            modelBuilder.Entity<Publisher>().HasData(new Publisher { Id = 3, Name = "Orion Publishing Co" });
            modelBuilder.Entity<Publisher>().HasData(new Publisher { Id = 4, Name = "Penguin Books Ltd" });
            modelBuilder.Entity<Publisher>().HasData(new Publisher { Id = 5, Name = "Penguin Random House Children's UK" });
            modelBuilder.Entity<Publisher>().HasData(new Publisher { Id = 6, Name = "Little Brown Book Group" });
            modelBuilder.Entity<Publisher>().HasData(new Publisher { Id = 7, Name = "FABER&FABER" });
            modelBuilder.Entity<Publisher>().HasData(new Publisher { Id = 8, Name = "HarperCollins Publishers" });
            modelBuilder.Entity<Publisher>().HasData(new Publisher { Id = 9, Name = "Vintage Publishing" });

            modelBuilder.Entity<Genre>().HasData(new Genre { Id = 1, Name = "Contemporary Fiction" });
            modelBuilder.Entity<Genre>().HasData(new Genre { Id = 2, Name = "Classic Books&Novels" });
            modelBuilder.Entity<Genre>().HasData(new Genre { Id = 3, Name = "Political&Legal" });
            modelBuilder.Entity<Genre>().HasData(new Genre { Id = 4, Name = "Science Fiction" });
            modelBuilder.Entity<Genre>().HasData(new Genre { Id = 5, Name = "Crime Fiction" });
            modelBuilder.Entity<Genre>().HasData(new Genre { Id = 6, Name = "Fantasy" });
            modelBuilder.Entity<Genre>().HasData(new Genre { Id = 7, Name = "Thriller" });
            modelBuilder.Entity<Genre>().HasData(new Genre { Id = 8, Name = "Historical Fiction" });
            modelBuilder.Entity<Genre>().HasData(new Genre { Id = 9, Name = "People&Places" });

            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9781444775815", Title = "A Man Called Ove", AvailableQuantity = 100, Format = "Paperback", Language = "English", Price = 9.01f, Pages = 320, PublicationDate = DateTime.Parse("2/3/2016") });
            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9781529019278", Title = "Shuggie Bain", AvailableQuantity = 200, Format = "Hardback", Language = "English", Price = 22.48f, Pages = 448, PublicationDate = DateTime.Parse("27/11/2020") });
            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9781474622578", Title = "The Queen's Gambit", AvailableQuantity = 150, Format = "Paperback", Language = "English", Price = 10.61f, Pages = 256, PublicationDate = DateTime.Parse("26/10/2020") });
            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9780141036144", Title = "1984", AvailableQuantity = 90, Format = "Paperback", Language = "English", Price = 9, Pages = 336, PublicationDate = DateTime.Parse("1/10/2008") });
            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9780241475249", Title = "Serpentine", AvailableQuantity = 230, Format = "Hardback", Language = "English", Price = 9.09f, Pages = 80, PublicationDate = DateTime.Parse("15/10/2020") });
            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9780751579932", Title = "Troubled Blood", AvailableQuantity = 170, Format = "Hardback", Language = "English", Price = 36.83f, Pages = 944, PublicationDate = DateTime.Parse("29/9/2020") });
            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9781473665187", Title = "Home Stretch", AvailableQuantity = 80, Format = "Hardback", Language = "English", Price = 20.79f, Pages = 368, PublicationDate = DateTime.Parse("1/10/2020") });
            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9780571356508", Title = "Find Me", AvailableQuantity = 277, Format = "Paperback", Language = "English", Price = 7.83f, Pages = 272, PublicationDate = DateTime.Parse("21/5/2020") });
            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9780007232161", Title = "Girl With a Pearl Earring", AvailableQuantity = 489, Format = "Paperback", Language = "English", Price = 10.53f, Pages = 288, PublicationDate = DateTime.Parse("1/6/2006") });
            modelBuilder.Entity<Book>().HasData(new Book { ISBN = "9780099448822", Title = "Norwegian Wood", AvailableQuantity = 48, Format = "Paperback", Language = "English", Price = 17.11f, Pages = 400, PublicationDate = DateTime.Parse("4/6/2003") });

            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 1, BookISBN = "9781444775815" });
            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 2, BookISBN = "9781529019278" });
            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 3, BookISBN = "9781474622578" });
            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 4, BookISBN = "9780141036144" });
            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 5, BookISBN = "9780241475249" });
            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 6, BookISBN = "9780751579932" });
            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 7, BookISBN = "9781473665187" });
            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 8, BookISBN = "9780571356508" });
            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 9, BookISBN = "9780007232161" });
            modelBuilder.Entity<BookAuthor>().HasData(new BookAuthor { AuthorId = 10, BookISBN = "9780099448822" });

            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 1, BookISBN = "9781444775815" });
            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 2, BookISBN = "9781529019278" });
            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 3, BookISBN = "9781474622578" });
            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 4, BookISBN = "9780141036144" });
            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 5, BookISBN = "9780241475249" });
            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 6, BookISBN = "9780751579932" });
            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 1, BookISBN = "9781473665187" });
            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 7, BookISBN = "9780571356508" });
            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 8, BookISBN = "9780007232161" });
            modelBuilder.Entity<BookPublisher>().HasData(new BookPublisher { PublisherId = 9, BookISBN = "9780099448822" });

            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 1, BookISBN = "9781444775815" });
            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 2, BookISBN = "9781529019278" });
            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 3, BookISBN = "9781474622578" });
            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 4, BookISBN = "9780141036144" });
            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 5, BookISBN = "9780241475249" });
            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 6, BookISBN = "9780751579932" });
            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 1, BookISBN = "9781473665187" });
            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 7, BookISBN = "9780571356508" });
            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 8, BookISBN = "9780007232161" });
            modelBuilder.Entity<BookGenre>().HasData(new BookGenre { GenreId = 9, BookISBN = "9780099448822" });
        }

        private void RestrictCascadeDelete(ModelBuilder modelBuilder)
        {
            foreach (var relationship in modelBuilder.Model.GetEntityTypes()
                .Where(e => !e.IsOwned()).SelectMany(e => e.GetForeignKeys()))
            {
                relationship.DeleteBehavior = DeleteBehavior.Restrict;
            }
        }

        private void SetUtcDateTime(ModelBuilder modelBuilder)
        {
            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                v => v, v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime) || property.ClrType == typeof(DateTime?))
                        property.SetValueConverter(dateTimeConverter);
                }
            }
        }
    }
}
