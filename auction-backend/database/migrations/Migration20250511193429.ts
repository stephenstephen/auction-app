import { Migration } from '@mikro-orm/migrations';

export class Migration20250511193429 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "users" add column "username" varchar(255) not null, add column "password" varchar(255) not null;');
    this.addSql('alter table "users" drop constraint "users_name_unique";');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop constraint "users_username_unique";');
    this.addSql('alter table "users" drop column "username";');
    this.addSql('alter table "users" drop column "password";');
    this.addSql('alter table "users" add constraint "users_name_unique" unique ("name");');
  }

}
