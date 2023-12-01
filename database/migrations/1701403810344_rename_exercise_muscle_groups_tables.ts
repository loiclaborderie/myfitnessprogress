import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RenameExerciseMuscleGroupsTable extends BaseSchema {
  protected tableName = 'exercise_muscle_groups'

  public async up () {
    this.schema.renameTable(this.tableName, 'exercise_muscle_group')
  }

  public async down () {
    this.schema.renameTable('exercise_muscle_group', this.tableName)
  }
}