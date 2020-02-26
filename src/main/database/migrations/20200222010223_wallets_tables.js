exports.up = async function(knex, Promise) {
  await knex.schema.createTable("wallets", function(table) {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable();
    table
      .uuid("guid")
      .notNullable()
      .comment(
        "This is uuid for public exposes, does not conflict with other columns."
      );
    table.decimal("amount").defaultTo(0.0);
    table.decimal("hold_amount").defaultTo(0.0);
    table.decimal("used_amount").defaultTo(0.0);
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
  });

  await knex.schema.createTable("transactions", function(table) {
    table
      .bigIncrements("id")
      .unsigned()
      .notNullable();
    table.uuid("transaction_id").notNullable();
    table
      .bigInteger("wallet_id")
      .unsigned()
      .references("id")
      .inTable("wallets")
      .onDelete("CASCADE");
    table.string("reference_id", 128).defaultTo("");
    table.decimal("pre_amount").defaultTo(0.0);
    table.decimal("amount").defaultTo(0.0);
    table.decimal("post_amount").defaultTo(0.0);
    table
      .datetime("expires_at")
      .nullable()
      .comment("On hold amount expire time");
    table.string("status", 50).defaultTo("");
    table.string("description", 256).defaultTo("");
    table.datetime("created_at").defaultTo(knex.fn.now());
    table.datetime("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {};
