import { Migration } from '@mikro-orm/migrations';

export class Migration20250515042458 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "auctions" add column "winner_id" uuid null;');
    this.addSql('alter table "auctions" add constraint "auctions_winner_id_foreign" foreign key ("winner_id") references "users" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "auctions" drop constraint "auctions_winner_id_foreign";');

    this.addSql('alter table "auctions" drop column "winner_id";');
  }

}
