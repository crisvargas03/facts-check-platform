namespace FactCheckBack.Models.Entities
{
    public abstract class BaseEntity<T> where T : struct
    {
        public T Id { get; set; }
        public string CreatedBy { get; private set; } = string.Empty;
        public DateTime CreationDate { get; private set; } = DateTime.UtcNow;
        public bool IsDeleted { get; private set; } = false;
        public string? ModifiedBy { get; private set; }
        public DateTime? ModificationDate { get; private set; }

        protected BaseEntity(){}

        public void SetCreationAudit(string createdBy)
        {
            CreatedBy = createdBy;
            CreationDate = DateTime.UtcNow;
        }

        public void SetModificationAudit(string modifiedBy)
        {
            ModifiedBy = modifiedBy;
            ModificationDate = DateTime.UtcNow;
        }

        public void MarkAsDeleted(string modifiedBy)
        {
            IsDeleted = true;
            SetModificationAudit(modifiedBy);
        }

        public void Restore(string modifiedBy)
        {
            IsDeleted = false;
            SetModificationAudit(modifiedBy);
        }
    }
}
