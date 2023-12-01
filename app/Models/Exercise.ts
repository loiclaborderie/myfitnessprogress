import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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
  public difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'

  @column()
  public type:
    | 'warmup'
    | 'stretch'
    | 'volume'
    | 'cooldown'
    | 'cardio'
    | 'strength'
    | 'power'
    | 'plyometric'
    | 'other'
    | 'any'

  @column()
  public instructions: string | null

  // @manyToMany(() => MuscleGroup)
  // public muscleGroups: ManyToMany<typeof MuscleGroup>

  // @manyToMany(() => Category)
  // public categories: ManyToMany<typeof Categories>

  // @manyToMany(() => Equipment)
  // public equipmentNeeded: ManyToMany<typeof Equipment>
}
