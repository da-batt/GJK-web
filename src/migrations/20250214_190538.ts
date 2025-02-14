import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_header_tabs_links_link_type" AS ENUM('internal', 'custom');
  CREATE TYPE "public"."enum_header_tabs_link_type" AS ENUM('internal', 'custom');
  CREATE TABLE IF NOT EXISTS "header_tabs_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_tabs_links_link_type" DEFAULT 'internal',
  	"link_reference_id" integer,
  	"link_url" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header_tabs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"enable_dropdown" boolean,
  	"enable_direct_link" boolean,
  	"link_type" "enum_header_tabs_link_type" DEFAULT 'internal',
  	"link_reference_id" integer,
  	"link_url" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "content" SET NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" SET NOT NULL;
  DO $$ BEGIN
   ALTER TABLE "header_tabs_links" ADD CONSTRAINT "header_tabs_links_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_tabs_links" ADD CONSTRAINT "header_tabs_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_tabs"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_tabs" ADD CONSTRAINT "header_tabs_link_reference_id_pages_id_fk" FOREIGN KEY ("link_reference_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "header_tabs" ADD CONSTRAINT "header_tabs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "header_tabs_links_order_idx" ON "header_tabs_links" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_tabs_links_parent_id_idx" ON "header_tabs_links" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_tabs_links_link_link_reference_idx" ON "header_tabs_links" USING btree ("link_reference_id");
  CREATE INDEX IF NOT EXISTS "header_tabs_order_idx" ON "header_tabs" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "header_tabs_parent_id_idx" ON "header_tabs" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "header_tabs_link_link_reference_idx" ON "header_tabs" USING btree ("link_reference_id");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_tabs_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_tabs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "header_tabs_links" CASCADE;
  DROP TABLE "header_tabs" CASCADE;
  DROP TABLE "header" CASCADE;
  ALTER TABLE "pages" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "content" DROP NOT NULL;
  ALTER TABLE "pages" ALTER COLUMN "slug" DROP NOT NULL;
  DROP TYPE "public"."enum_header_tabs_links_link_type";
  DROP TYPE "public"."enum_header_tabs_link_type";`);
}
