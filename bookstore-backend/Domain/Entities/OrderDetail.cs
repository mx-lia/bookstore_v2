namespace Domain.Entities
{
    public class OrderDetail
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public int OrderId { get; set; }
        public Order Order { get; set; }
        public string BookISBN { get; set; }
        public Book Book { get; set; }
    }
}
