using FactCheckBack.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace FactCheckBack.Data.Context
{
    public partial class FactCheckBackDbContext : DbContext
    {
        public FactCheckBackDbContext(DbContextOptions<FactCheckBackDbContext> options) : base(options)
        {
        }

        public virtual DbSet<Article_input> Article_inputs { get; set; }

        public virtual DbSet<Article_type> Article_types { get; set; }

        public virtual DbSet<Plan> Plans { get; set; }

        public virtual DbSet<Plan_type> Plan_types { get; set; }

        public virtual DbSet<Result> Results { get; set; }

        public virtual DbSet<Users> Users { get; set; }

        public virtual DbSet<User_Type> User_Types { get; set; }

        public virtual DbSet<User_plan> User_plans { get; set; }

        public virtual DbSet<Verdict> Verdicts { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasPostgresEnum("auth", "aal_level", new[] { "aal1", "aal2", "aal3" })
                .HasPostgresEnum("auth", "code_challenge_method", new[] { "s256", "plain" })
                .HasPostgresEnum("auth", "factor_status", new[] { "unverified", "verified" })
                .HasPostgresEnum("auth", "factor_type", new[] { "totp", "webauthn", "phone" })
                .HasPostgresEnum("auth", "one_time_token_type", new[] { "confirmation_token", "reauthentication_token", "recovery_token", "email_change_token_new", "email_change_token_current", "phone_change_token" })
                .HasPostgresEnum("realtime", "action", new[] { "INSERT", "UPDATE", "DELETE", "TRUNCATE", "ERROR" })
                .HasPostgresEnum("realtime", "equality_op", new[] { "eq", "neq", "lt", "lte", "gt", "gte", "in" })
                .HasPostgresExtension("extensions", "pg_stat_statements")
                .HasPostgresExtension("extensions", "pgcrypto")
                .HasPostgresExtension("extensions", "uuid-ossp")
                .HasPostgresExtension("graphql", "pg_graphql")
                .HasPostgresExtension("vault", "supabase_vault");

            modelBuilder.Entity<Article_input>(entity =>
            {
                entity.HasKey(e => e.article_id).HasName("Article_input_pkey");

                entity.ToTable("Article_input");

                entity.Property(e => e.article_id).HasMaxLength(50);
                entity.Property(e => e.article_type_id).HasMaxLength(50);
                entity.Property(e => e.created).HasColumnType("timestamp without time zone");
                entity.Property(e => e.title).HasMaxLength(50);
                entity.Property(e => e.user_id).HasMaxLength(50);

                entity.HasOne(d => d.article_type).WithMany(p => p.Article_inputs)
                    .HasForeignKey(d => d.article_type_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Article_input_article_type_id_fkey");

                entity.HasOne(d => d.users).WithMany(p => p.Article_inputs)
                    .HasForeignKey(d => d.user_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Article_input_user_id_fkey");
            });

            modelBuilder.Entity<Article_type>(entity =>
            {
                entity.HasKey(e => e.article_type_id).HasName("Article_type_pkey");

                entity.ToTable("Article_type");

                entity.Property(e => e.article_type_id).HasMaxLength(50);
                entity.Property(e => e.desc_text).HasMaxLength(50);
            });

            modelBuilder.Entity<Plan>(entity =>
            {
                entity.HasKey(e => e.plans_id).HasName("Plans_pkey");

                entity.Property(e => e.plans_id).HasMaxLength(50);
                entity.Property(e => e.period_type).HasMaxLength(50);
                entity.Property(e => e.plan_type_id).HasMaxLength(50);
                entity.Property(e => e.price).HasMaxLength(50);

                entity.HasOne(d => d.plan_type).WithMany(p => p.Plans)
                    .HasForeignKey(d => d.plan_type_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("Plans_plan_type_id_fkey");
            });

            modelBuilder.Entity<Plan_type>(entity =>
            {
                entity.HasKey(e => e.plan_type_id).HasName("Plan_type_pkey");

                entity.ToTable("Plan_type");

                entity.Property(e => e.plan_type_id).HasMaxLength(50);
                entity.Property(e => e.desc_text).HasMaxLength(50);
            });

            modelBuilder.Entity<Result>(entity =>
            {
                entity.HasKey(e => e.result_id).HasName("Result_pkey");

                entity.ToTable("Result");

                entity.Property(e => e.result_id).HasMaxLength(50);
                entity.Property(e => e.article_id).HasMaxLength(50);
                entity.Property(e => e.created).HasColumnType("timestamp without time zone");
                entity.Property(e => e.verdict_id).HasMaxLength(50);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.HasKey(e => e.user_id).HasName("User_pkey");

                entity.ToTable("Users");

                entity.Property(e => e.user_id).HasMaxLength(50);
                entity.Property(e => e.created).HasColumnType("timestamp without time zone");
                entity.Property(e => e.email).HasMaxLength(50);
                entity.Property(e => e.name).HasMaxLength(50);
                entity.Property(e => e.password).HasMaxLength(50);
                entity.Property(e => e.user_type_id).HasMaxLength(50);

                entity.HasOne(d => d.user_type).WithMany(p => p.User1s)
                    .HasForeignKey(d => d.user_type_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("User_user_type_id_fkey");
            });

            modelBuilder.Entity<User_Type>(entity =>
            {
                entity.HasKey(e => e.user_type_id).HasName("User_Type_pkey");

                entity.ToTable("User_Type");

                entity.Property(e => e.user_type_id).HasMaxLength(50);
                entity.Property(e => e.desc_text).HasMaxLength(50);
            });

            modelBuilder.Entity<User_plan>(entity =>
            {
                entity.HasKey(e => e.user_id).HasName("User_plan_pkey");

                entity.ToTable("User_plan");

                entity.Property(e => e.user_id).HasMaxLength(50);
                entity.Property(e => e.end_date_agreement_)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("end_date_agreement ");
                entity.Property(e => e.plans_id).HasMaxLength(50);
                entity.Property(e => e.start_date_agreement_)
                    .HasColumnType("timestamp without time zone")
                    .HasColumnName("start_date_agreement ");

                entity.HasOne(d => d.plans).WithMany(p => p.User_plans)
                    .HasForeignKey(d => d.plans_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("User_plan_plans_id_fkey");

                entity.HasOne(d => d.users).WithOne(p => p.User_plan)
                    .HasForeignKey<User_plan>(d => d.user_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("User_plan_user_id_fkey");
            });

            modelBuilder.Entity<Verdict>(entity =>
            {
                entity.HasKey(e => e.verdict_id).HasName("Verdict_pkey");

                entity.ToTable("Verdict");

                entity.Property(e => e.verdict_id).HasMaxLength(50);
                entity.Property(e => e.desc_text).HasMaxLength(50);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
