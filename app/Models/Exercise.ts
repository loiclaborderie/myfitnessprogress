import { BaseModel, BelongsTo, ManyToMany, belongsTo, column, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import { ExerciseDifficulty } from 'App/types/exerciseEnums'
import MuscleGroup from './MuscleGroup'
import Category from './Category'

export default class Exercise extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public imageUrl: string | null

  @column()
  public videoUrl: string | null

  @column()
  public difficulty: ExerciseDifficulty

  @column()
  public instructions: string | null

  @manyToMany(() => MuscleGroup)
  public muscleGroups: ManyToMany<typeof MuscleGroup>

  @column() // Define category_id as a model property
  public categoryId: number; // Define the type of category_id

  @belongsTo(() => Category)
  public category: BelongsTo<typeof Category>

  // @manyToMany(() => Equipment)
  // public equipmentNeeded: ManyToMany<typeof Equipment>
}
