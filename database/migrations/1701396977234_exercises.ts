import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'exercises'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.string('description', 255).notNullable()
      table.string('image_url', 255).nullable()
      table.string('video_url', 255).nullable()
      table.string('difficulty', 255).notNullable()
      table.string('instructions', 255).nullable()
      table.integer('category_id').unsigned().references('categories.id').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
