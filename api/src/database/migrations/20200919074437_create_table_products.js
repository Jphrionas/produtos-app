const TABLE_NAME = "PRODUTO";

exports.up  = knex => knex.schema.createTable(TABLE_NAME, table => {
  table.increments('CODIGO').notNullable();
  table.string('DESCRICAO', 100).notNullable();
  table.string('CD_BARRA', 14).nullable();

  table.specificType('TIPO', 'CHAR(1) NOT NULL');
  table.specificType('ORIGEM', 'NUMERIC(1,0)');
  
  table.specificType('VL_PRECO_VENDA', 'NUMERIC(6, 2) UNSIGNED NOT NULL');
  table.date('DT_ULTIMA_COMPRA').notNullable();

  table.timestamps(true, true);
});

exports.down  = async knex => knex.schema.dropTable(TABLE_NAME)
