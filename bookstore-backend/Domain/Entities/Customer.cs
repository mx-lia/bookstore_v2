using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace Domain.Entities
{
    public class Customer
    {
        public int Id { get; set; }
        public int Role { get; set; } = 2;
        [Required]
        [MaxLength(100)]
        public string FirstName { get; set; }
        [Required]
        [MaxLength(100)]
        public string LastName { get; set; }
        [Required]
        [MaxLength(100)]
        public string Email { get; set; }
        [JsonIgnore]
        [Required]
        public string Password { get; set; }
        [MaxLength(6)]
        public string PostalCode { get; set; }
        [MaxLength(50)]
        public string Country { get; set; }
        [MaxLength(50)]
        public string City { get; set; }
        [MaxLength(100)]
        public string Street { get; set; }
        public string BuildingNo { get; set; }
        public string FlatNo { get; set; }
        [MaxLength(9)]
        public string PhoneNumber { get; set; }
        public IList<Order> Orders { get; set; }
        public IList<FavouriteBook> FavouriteBooks { get; set; }
    }
}
