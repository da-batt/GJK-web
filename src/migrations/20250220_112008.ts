import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_tabs_links" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "header_tabs" ADD COLUMN "link_new_tab" boolean;
  ALTER TABLE "footer_columns_links" ADD COLUMN "link_new_tab" boolean;`);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "header_tabs_links" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "header_tabs" DROP COLUMN IF EXISTS "link_new_tab";
  ALTER TABLE "footer_columns_links" DROP COLUMN IF EXISTS "link_new_tab";`);
}
