import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'exercises'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.string('imageUrl', 255).nullable()
      table.string('videoUrl', 255).nullable()
      table.string('difficulty', 255).notNullable()
      table.string('type', 255).notNullable().defaultTo('any')
      table.string('instructions', 255).nullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
