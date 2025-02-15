import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sizes_square_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_square_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_square_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_square_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_square_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_square_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_landscape_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_landscape_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_landscape_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_landscape_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_landscape_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_landscape_filename" varchar;
  CREATE INDEX IF NOT EXISTS "media_sizes_square_sizes_square_filename_idx" ON "media" USING btree ("sizes_square_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX IF NOT EXISTS "media_sizes_landscape_sizes_landscape_filename_idx" ON "media" USING btree ("sizes_landscape_filename");`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "media_sizes_square_sizes_square_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_card_sizes_card_filename_idx";
  DROP INDEX IF EXISTS "media_sizes_landscape_sizes_landscape_filename_idx";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_square_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_card_filename";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_landscape_url";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_landscape_width";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_landscape_height";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_landscape_mime_type";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_landscape_filesize";
  ALTER TABLE "media" DROP COLUMN IF EXISTS "sizes_landscape_filename";`);
}
