import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'muscle_groups'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.text('muscle_group').notNullable()
      table.text('image_url').nullable()
      table.text('description').nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
