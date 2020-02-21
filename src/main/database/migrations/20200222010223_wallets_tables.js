exports.up = async function (knex, Promise) {
    await knex.schema.createTable('wallets', function (table) {
        table.bigIncrements('id').unsigned().notNullable();
        table.uuid('uuid').notNullable().comment('This is uuid for public exposes, does not conflict with other columns.');
        table.decimal('amount').defaultTo(0.00);
        table.decimal('hold_amount').defaultTo(0.00);
        table.decimal('used_amount').defaultTo(0.00);
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('holdings', function (table) {
        table.bigIncrements('id').unsigned().notNullable();
        table.uuid('uuid').notNullable();
        table.bigInteger('wallet_id').unsigned().references('id').inTable('wallets').onDelete('CASCADE');
        table.decimal('amount').defaultTo(0.00);
        table.datetime('expires_at').defaultTo(knex.fn.now());
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
    });

    await knex.schema.createTable('transactions', function (table) {
        table.bigIncrements('id').unsigned().notNullable();
        table.uuid('transaction_id').notNullable();
        table.bigInteger('wallet_id').unsigned().references('id').inTable('wallets').onDelete('CASCADE');
        table.string('ext_txn_id', 128).defaultTo('');
        table.decimal('pre_amount').defaultTo(0.00);
        table.decimal('amount').defaultTo(0.00);
        table.decimal('post_amount').defaultTo(0.00);
        table.string('description', 256).defaultTo('');
        table.json('meta_data');
        table.datetime('created_at').defaultTo(knex.fn.now());
        table.datetime('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {

};