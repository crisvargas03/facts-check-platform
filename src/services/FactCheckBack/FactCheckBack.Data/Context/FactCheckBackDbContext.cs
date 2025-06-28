using Microsoft.EntityFrameworkCore;
using System.Reflection;
using FactCheckBack.Models.Entities;

namespace FactCheckBack.Data.Context
{
    public partial class FactCheckBackDbContext : DbContext
    {
        public FactCheckBackDbContext(DbContextOptions<FactCheckBackDbContext> options) : base(options)
        {
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        //}

        public virtual DbSet<Article_input> Article_inputs { get; set; }

        public virtual DbSet<Article_type> Article_types { get; set; }

        public virtual DbSet<Plan> Plans { get; set; }

        public virtual DbSet<Plan_type> Plan_types { get; set; }

        public virtual DbSet<Result> Results { get; set; }

        public virtual DbSet<Users> Users { get; set; }

        public virtual DbSet<User_Type> User_Types { get; set; }

        public virtual DbSet<User_plan> User_plans { get; set; }

        public virtual DbSet<Verdict> Verdicts { get; set; }

        public virtual DbSet<_object> objects { get; set; }

        public virtual DbSet<audit_log_entry> audit_log_entries { get; set; }

        public virtual DbSet<bucket> buckets { get; set; }

        public virtual DbSet<flow_state> flow_states { get; set; }

        public virtual DbSet<identity> identities { get; set; }

        public virtual DbSet<instance> instances { get; set; }

        public virtual DbSet<mfa_amr_claim> mfa_amr_claims { get; set; }

        public virtual DbSet<mfa_challenge> mfa_challenges { get; set; }

        public virtual DbSet<mfa_factor> mfa_factors { get; set; }

        public virtual DbSet<migration> migrations { get; set; }

        public virtual DbSet<one_time_token> one_time_tokens { get; set; }

        public virtual DbSet<refresh_token> refresh_tokens { get; set; }

        public virtual DbSet<s3_multipart_upload> s3_multipart_uploads { get; set; }

        public virtual DbSet<s3_multipart_uploads_part> s3_multipart_uploads_parts { get; set; }

        public virtual DbSet<saml_provider> saml_providers { get; set; }

        public virtual DbSet<saml_relay_state> saml_relay_states { get; set; }

        public virtual DbSet<schema_migration> schema_migrations { get; set; }

        public virtual DbSet<schema_migration1> schema_migrations1 { get; set; }

        public virtual DbSet<session> sessions { get; set; }

        public virtual DbSet<sso_domain> sso_domains { get; set; }

        public virtual DbSet<sso_provider> sso_providers { get; set; }

        public virtual DbSet<subscription> subscriptions { get; set; }

        public virtual DbSet<user> users { get; set; }

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

            modelBuilder.Entity<_object>(entity =>
            {
                entity.HasKey(e => e.id).HasName("objects_pkey");

                entity.ToTable("objects", "storage");

                entity.HasIndex(e => new { e.bucket_id, e.name }, "bucketid_objname").IsUnique();

                entity.HasIndex(e => new { e.bucket_id, e.name }, "idx_objects_bucket_id_name").UseCollation(new[] { null, "C" });

                entity.HasIndex(e => e.name, "name_prefix_search").HasOperators(new[] { "text_pattern_ops" });

                entity.Property(e => e.id).HasDefaultValueSql("gen_random_uuid()");
                entity.Property(e => e.created_at).HasDefaultValueSql("now()");
                entity.Property(e => e.last_accessed_at).HasDefaultValueSql("now()");
                entity.Property(e => e.metadata).HasColumnType("jsonb");
                entity.Property(e => e.owner).HasComment("Field is deprecated, use owner_id instead");
                entity.Property(e => e.path_tokens).HasComputedColumnSql("string_to_array(name, '/'::text)", true);
                entity.Property(e => e.updated_at).HasDefaultValueSql("now()");
                entity.Property(e => e.user_metadata).HasColumnType("jsonb");

                entity.HasOne(d => d.bucket).WithMany(p => p._objects)
                    .HasForeignKey(d => d.bucket_id)
                    .HasConstraintName("objects_bucketId_fkey");
            });

            modelBuilder.Entity<audit_log_entry>(entity =>
            {
                entity.HasKey(e => e.id).HasName("audit_log_entries_pkey");

                entity.ToTable("audit_log_entries", "auth", tb => tb.HasComment("Auth: Audit trail for user actions."));

                entity.HasIndex(e => e.instance_id, "audit_logs_instance_id_idx");

                entity.Property(e => e.id).ValueGeneratedNever();
                entity.Property(e => e.ip_address)
                    .HasMaxLength(64)
                    .HasDefaultValueSql("''::character varying");
                entity.Property(e => e.payload).HasColumnType("json");
            });

            modelBuilder.Entity<bucket>(entity =>
            {
                entity.HasKey(e => e.id).HasName("buckets_pkey");

                entity.ToTable("buckets", "storage");

                entity.HasIndex(e => e.name, "bname").IsUnique();

                entity.Property(e => e._public)
                    .HasDefaultValue(false)
                    .HasColumnName("public");
                entity.Property(e => e.avif_autodetection).HasDefaultValue(false);
                entity.Property(e => e.created_at).HasDefaultValueSql("now()");
                entity.Property(e => e.owner).HasComment("Field is deprecated, use owner_id instead");
                entity.Property(e => e.updated_at).HasDefaultValueSql("now()");
            });

            modelBuilder.Entity<flow_state>(entity =>
            {
                entity.HasKey(e => e.id).HasName("flow_state_pkey");

                entity.ToTable("flow_state", "auth", tb => tb.HasComment("stores metadata for pkce logins"));

                entity.HasIndex(e => e.created_at, "flow_state_created_at_idx").IsDescending();

                entity.HasIndex(e => e.auth_code, "idx_auth_code");

                entity.HasIndex(e => new { e.user_id, e.authentication_method }, "idx_user_id_auth_method");

                entity.Property(e => e.id).ValueGeneratedNever();
            });

            modelBuilder.Entity<identity>(entity =>
            {
                entity.HasKey(e => e.id).HasName("identities_pkey");

                entity.ToTable("identities", "auth", tb => tb.HasComment("Auth: Stores identities associated to a user."));

                entity.HasIndex(e => e.email, "identities_email_idx").HasOperators(new[] { "text_pattern_ops" });

                entity.HasIndex(e => new { e.provider_id, e.provider }, "identities_provider_id_provider_unique").IsUnique();

                entity.HasIndex(e => e.user_id, "identities_user_id_idx");

                entity.Property(e => e.id).HasDefaultValueSql("gen_random_uuid()");
                entity.Property(e => e.email)
                    .HasComputedColumnSql("lower((identity_data ->> 'email'::text))", true)
                    .HasComment("Auth: Email is a generated column that references the optional email property in the identity_data");
                entity.Property(e => e.identity_data).HasColumnType("jsonb");

                entity.HasOne(d => d.user).WithMany(p => p.identities)
                    .HasForeignKey(d => d.user_id)
                    .HasConstraintName("identities_user_id_fkey");
            });

            modelBuilder.Entity<instance>(entity =>
            {
                entity.HasKey(e => e.id).HasName("instances_pkey");

                entity.ToTable("instances", "auth", tb => tb.HasComment("Auth: Manages users across multiple sites."));

                entity.Property(e => e.id).ValueGeneratedNever();
            });

            modelBuilder.Entity<mfa_amr_claim>(entity =>
            {
                entity.HasKey(e => e.id).HasName("amr_id_pk");

                entity.ToTable("mfa_amr_claims", "auth", tb => tb.HasComment("auth: stores authenticator method reference claims for multi factor authentication"));

                entity.HasIndex(e => new { e.session_id, e.authentication_method }, "mfa_amr_claims_session_id_authentication_method_pkey").IsUnique();

                entity.Property(e => e.id).ValueGeneratedNever();

                entity.HasOne(d => d.session).WithMany(p => p.mfa_amr_claims)
                    .HasForeignKey(d => d.session_id)
                    .HasConstraintName("mfa_amr_claims_session_id_fkey");
            });

            modelBuilder.Entity<mfa_challenge>(entity =>
            {
                entity.HasKey(e => e.id).HasName("mfa_challenges_pkey");

                entity.ToTable("mfa_challenges", "auth", tb => tb.HasComment("auth: stores metadata about challenge requests made"));

                entity.HasIndex(e => e.created_at, "mfa_challenge_created_at_idx").IsDescending();

                entity.Property(e => e.id).ValueGeneratedNever();
                entity.Property(e => e.web_authn_session_data).HasColumnType("jsonb");

                entity.HasOne(d => d.factor).WithMany(p => p.mfa_challenges)
                    .HasForeignKey(d => d.factor_id)
                    .HasConstraintName("mfa_challenges_auth_factor_id_fkey");
            });

            modelBuilder.Entity<mfa_factor>(entity =>
            {
                entity.HasKey(e => e.id).HasName("mfa_factors_pkey");

                entity.ToTable("mfa_factors", "auth", tb => tb.HasComment("auth: stores metadata about factors"));

                entity.HasIndex(e => new { e.user_id, e.created_at }, "factor_id_created_at_idx");

                entity.HasIndex(e => e.last_challenged_at, "mfa_factors_last_challenged_at_key").IsUnique();

                entity.HasIndex(e => new { e.friendly_name, e.user_id }, "mfa_factors_user_friendly_name_unique")
                    .IsUnique()
                    .HasFilter("(TRIM(BOTH FROM friendly_name) <> ''::text)");

                entity.HasIndex(e => e.user_id, "mfa_factors_user_id_idx");

                entity.HasIndex(e => new { e.user_id, e.phone }, "unique_phone_factor_per_user").IsUnique();

                entity.Property(e => e.id).ValueGeneratedNever();
                entity.Property(e => e.web_authn_credential).HasColumnType("jsonb");

                entity.HasOne(d => d.user).WithMany(p => p.mfa_factors)
                    .HasForeignKey(d => d.user_id)
                    .HasConstraintName("mfa_factors_user_id_fkey");
            });

            modelBuilder.Entity<migration>(entity =>
            {
                entity.HasKey(e => e.id).HasName("migrations_pkey");

                entity.ToTable("migrations", "storage");

                entity.HasIndex(e => e.name, "migrations_name_key").IsUnique();

                entity.Property(e => e.id).ValueGeneratedNever();
                entity.Property(e => e.executed_at)
                    .HasDefaultValueSql("CURRENT_TIMESTAMP")
                    .HasColumnType("timestamp without time zone");
                entity.Property(e => e.hash).HasMaxLength(40);
                entity.Property(e => e.name).HasMaxLength(100);
            });

            modelBuilder.Entity<one_time_token>(entity =>
            {
                entity.HasKey(e => e.id).HasName("one_time_tokens_pkey");

                entity.ToTable("one_time_tokens", "auth");

                entity.HasIndex(e => e.relates_to, "one_time_tokens_relates_to_hash_idx").HasMethod("hash");

                entity.HasIndex(e => e.token_hash, "one_time_tokens_token_hash_hash_idx").HasMethod("hash");

                entity.Property(e => e.id).ValueGeneratedNever();
                entity.Property(e => e.created_at)
                    .HasDefaultValueSql("now()")
                    .HasColumnType("timestamp without time zone");
                entity.Property(e => e.updated_at)
                    .HasDefaultValueSql("now()")
                    .HasColumnType("timestamp without time zone");

                entity.HasOne(d => d.user).WithMany(p => p.one_time_tokens)
                    .HasForeignKey(d => d.user_id)
                    .HasConstraintName("one_time_tokens_user_id_fkey");
            });

            modelBuilder.Entity<refresh_token>(entity =>
            {
                entity.HasKey(e => e.id).HasName("refresh_tokens_pkey");

                entity.ToTable("refresh_tokens", "auth", tb => tb.HasComment("Auth: Store of tokens used to refresh JWT tokens once they expire."));

                entity.HasIndex(e => e.instance_id, "refresh_tokens_instance_id_idx");

                entity.HasIndex(e => new { e.instance_id, e.user_id }, "refresh_tokens_instance_id_user_id_idx");

                entity.HasIndex(e => e.parent, "refresh_tokens_parent_idx");

                entity.HasIndex(e => new { e.session_id, e.revoked }, "refresh_tokens_session_id_revoked_idx");

                entity.HasIndex(e => e.token, "refresh_tokens_token_unique").IsUnique();

                entity.HasIndex(e => e.updated_at, "refresh_tokens_updated_at_idx").IsDescending();

                entity.Property(e => e.parent).HasMaxLength(255);
                entity.Property(e => e.token).HasMaxLength(255);
                entity.Property(e => e.user_id).HasMaxLength(255);

                entity.HasOne(d => d.session).WithMany(p => p.refresh_tokens)
                    .HasForeignKey(d => d.session_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("refresh_tokens_session_id_fkey");
            });

            modelBuilder.Entity<s3_multipart_upload>(entity =>
            {
                entity.HasKey(e => e.id).HasName("s3_multipart_uploads_pkey");

                entity.ToTable("s3_multipart_uploads", "storage");

                entity.HasIndex(e => new { e.bucket_id, e.key, e.created_at }, "idx_multipart_uploads_list").UseCollation(new[] { null, "C", null });

                entity.Property(e => e.created_at).HasDefaultValueSql("now()");
                entity.Property(e => e.in_progress_size).HasDefaultValue(0L);
                entity.Property(e => e.key).UseCollation("C");
                entity.Property(e => e.user_metadata).HasColumnType("jsonb");

                entity.HasOne(d => d.bucket).WithMany(p => p.s3_multipart_uploads)
                    .HasForeignKey(d => d.bucket_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("s3_multipart_uploads_bucket_id_fkey");
            });

            modelBuilder.Entity<s3_multipart_uploads_part>(entity =>
            {
                entity.HasKey(e => e.id).HasName("s3_multipart_uploads_parts_pkey");

                entity.ToTable("s3_multipart_uploads_parts", "storage");

                entity.Property(e => e.id).HasDefaultValueSql("gen_random_uuid()");
                entity.Property(e => e.created_at).HasDefaultValueSql("now()");
                entity.Property(e => e.key).UseCollation("C");
                entity.Property(e => e.size).HasDefaultValue(0L);

                entity.HasOne(d => d.bucket).WithMany(p => p.s3_multipart_uploads_parts)
                    .HasForeignKey(d => d.bucket_id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("s3_multipart_uploads_parts_bucket_id_fkey");

                entity.HasOne(d => d.upload).WithMany(p => p.s3_multipart_uploads_parts)
                    .HasForeignKey(d => d.upload_id)
                    .HasConstraintName("s3_multipart_uploads_parts_upload_id_fkey");
            });

            modelBuilder.Entity<saml_provider>(entity =>
            {
                entity.HasKey(e => e.id).HasName("saml_providers_pkey");

                entity.ToTable("saml_providers", "auth", tb => tb.HasComment("Auth: Manages SAML Identity Provider connections."));

                entity.HasIndex(e => e.entity_id, "saml_providers_entity_id_key").IsUnique();

                entity.HasIndex(e => e.sso_provider_id, "saml_providers_sso_provider_id_idx");

                entity.Property(e => e.id).ValueGeneratedNever();
                entity.Property(e => e.attribute_mapping).HasColumnType("jsonb");

                entity.HasOne(d => d.sso_provider).WithMany(p => p.saml_providers)
                    .HasForeignKey(d => d.sso_provider_id)
                    .HasConstraintName("saml_providers_sso_provider_id_fkey");
            });

            modelBuilder.Entity<saml_relay_state>(entity =>
            {
                entity.HasKey(e => e.id).HasName("saml_relay_states_pkey");

                entity.ToTable("saml_relay_states", "auth", tb => tb.HasComment("Auth: Contains SAML Relay State information for each Service Provider initiated login."));

                entity.HasIndex(e => e.created_at, "saml_relay_states_created_at_idx").IsDescending();

                entity.HasIndex(e => e.for_email, "saml_relay_states_for_email_idx");

                entity.HasIndex(e => e.sso_provider_id, "saml_relay_states_sso_provider_id_idx");

                entity.Property(e => e.id).ValueGeneratedNever();

                entity.HasOne(d => d.flow_state).WithMany(p => p.saml_relay_states)
                    .HasForeignKey(d => d.flow_state_id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("saml_relay_states_flow_state_id_fkey");

                entity.HasOne(d => d.sso_provider).WithMany(p => p.saml_relay_states)
                    .HasForeignKey(d => d.sso_provider_id)
                    .HasConstraintName("saml_relay_states_sso_provider_id_fkey");
            });

            modelBuilder.Entity<schema_migration>(entity =>
            {
                entity.HasKey(e => e.version).HasName("schema_migrations_pkey");

                entity.ToTable("schema_migrations", "auth", tb => tb.HasComment("Auth: Manages updates to the auth system."));

                entity.Property(e => e.version).HasMaxLength(255);
            });

            modelBuilder.Entity<schema_migration1>(entity =>
            {
                entity.HasKey(e => e.version).HasName("schema_migrations_pkey");

                entity.ToTable("schema_migrations", "realtime");

                entity.Property(e => e.version).ValueGeneratedNever();
                entity.Property(e => e.inserted_at).HasColumnType("timestamp(0) without time zone");
            });

            modelBuilder.Entity<session>(entity =>
            {
                entity.HasKey(e => e.id).HasName("sessions_pkey");

                entity.ToTable("sessions", "auth", tb => tb.HasComment("Auth: Stores session data associated to a user."));

                entity.HasIndex(e => e.not_after, "sessions_not_after_idx").IsDescending();

                entity.HasIndex(e => e.user_id, "sessions_user_id_idx");

                entity.HasIndex(e => new { e.user_id, e.created_at }, "user_id_created_at_idx");

                entity.Property(e => e.id).ValueGeneratedNever();
                entity.Property(e => e.not_after).HasComment("Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.");
                entity.Property(e => e.refreshed_at).HasColumnType("timestamp without time zone");

                entity.HasOne(d => d.user).WithMany(p => p.sessions)
                    .HasForeignKey(d => d.user_id)
                    .HasConstraintName("sessions_user_id_fkey");
            });

            modelBuilder.Entity<sso_domain>(entity =>
            {
                entity.HasKey(e => e.id).HasName("sso_domains_pkey");

                entity.ToTable("sso_domains", "auth", tb => tb.HasComment("Auth: Manages SSO email address domain mapping to an SSO Identity Provider."));

                entity.HasIndex(e => e.sso_provider_id, "sso_domains_sso_provider_id_idx");

                entity.Property(e => e.id).ValueGeneratedNever();

                entity.HasOne(d => d.sso_provider).WithMany(p => p.sso_domains)
                    .HasForeignKey(d => d.sso_provider_id)
                    .HasConstraintName("sso_domains_sso_provider_id_fkey");
            });

            modelBuilder.Entity<sso_provider>(entity =>
            {
                entity.HasKey(e => e.id).HasName("sso_providers_pkey");

                entity.ToTable("sso_providers", "auth", tb => tb.HasComment("Auth: Manages SSO identity provider information; see saml_providers for SAML."));

                entity.Property(e => e.id).ValueGeneratedNever();
                entity.Property(e => e.resource_id).HasComment("Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.");
            });

            modelBuilder.Entity<subscription>(entity =>
            {
                entity.HasKey(e => e.id).HasName("pk_subscription");

                entity.ToTable("subscription", "realtime");

                entity.Property(e => e.id).UseIdentityAlwaysColumn();
                entity.Property(e => e.claims).HasColumnType("jsonb");
                entity.Property(e => e.created_at)
                    .HasDefaultValueSql("timezone('utc'::text, now())")
                    .HasColumnType("timestamp without time zone");
            });

            modelBuilder.Entity<user>(entity =>
            {
                entity.HasKey(e => e.id).HasName("users_pkey");

                entity.ToTable("users", "auth", tb => tb.HasComment("Auth: Stores user login data within a secure schema."));

                entity.HasIndex(e => e.confirmation_token, "confirmation_token_idx")
                    .IsUnique()
                    .HasFilter("((confirmation_token)::text !~ '^[0-9 ]*$'::text)");

                entity.HasIndex(e => e.email_change_token_current, "email_change_token_current_idx")
                    .IsUnique()
                    .HasFilter("((email_change_token_current)::text !~ '^[0-9 ]*$'::text)");

                entity.HasIndex(e => e.email_change_token_new, "email_change_token_new_idx")
                    .IsUnique()
                    .HasFilter("((email_change_token_new)::text !~ '^[0-9 ]*$'::text)");

                entity.HasIndex(e => e.reauthentication_token, "reauthentication_token_idx")
                    .IsUnique()
                    .HasFilter("((reauthentication_token)::text !~ '^[0-9 ]*$'::text)");

                entity.HasIndex(e => e.recovery_token, "recovery_token_idx")
                    .IsUnique()
                    .HasFilter("((recovery_token)::text !~ '^[0-9 ]*$'::text)");

                entity.HasIndex(e => e.email, "users_email_partial_key")
                    .IsUnique()
                    .HasFilter("(is_sso_user = false)");

                entity.HasIndex(e => e.instance_id, "users_instance_id_idx");

                entity.HasIndex(e => e.is_anonymous, "users_is_anonymous_idx");

                entity.HasIndex(e => e.phone, "users_phone_key").IsUnique();

                entity.Property(e => e.id).ValueGeneratedNever();
                entity.Property(e => e.aud).HasMaxLength(255);
                entity.Property(e => e.confirmation_token).HasMaxLength(255);
                entity.Property(e => e.confirmed_at).HasComputedColumnSql("LEAST(email_confirmed_at, phone_confirmed_at)", true);
                entity.Property(e => e.email).HasMaxLength(255);
                entity.Property(e => e.email_change).HasMaxLength(255);
                entity.Property(e => e.email_change_confirm_status).HasDefaultValue((short)0);
                entity.Property(e => e.email_change_token_current)
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''::character varying");
                entity.Property(e => e.email_change_token_new).HasMaxLength(255);
                entity.Property(e => e.encrypted_password).HasMaxLength(255);
                entity.Property(e => e.is_anonymous).HasDefaultValue(false);
                entity.Property(e => e.is_sso_user)
                    .HasDefaultValue(false)
                    .HasComment("Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.");
                entity.Property(e => e.phone).HasDefaultValueSql("NULL::character varying");
                entity.Property(e => e.phone_change).HasDefaultValueSql("''::character varying");
                entity.Property(e => e.phone_change_token)
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''::character varying");
                entity.Property(e => e.raw_app_meta_data).HasColumnType("jsonb");
                entity.Property(e => e.raw_user_meta_data).HasColumnType("jsonb");
                entity.Property(e => e.reauthentication_token)
                    .HasMaxLength(255)
                    .HasDefaultValueSql("''::character varying");
                entity.Property(e => e.recovery_token).HasMaxLength(255);
                entity.Property(e => e.role).HasMaxLength(255);
            });
            modelBuilder.HasSequence<int>("seq_schema_version", "graphql").IsCyclic();

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);

    }
}
