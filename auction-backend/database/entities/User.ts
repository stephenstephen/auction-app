import { Entity, Property, Unique } from '@mikro-orm/core'
import { EntityInitData } from '../types/types'
import { BaseEntity } from './BaseEntity'

@Entity({ tableName: 'users' })
export class UserEntity extends BaseEntity {
  constructor(init: EntityInitData<UserEntity, 'name' | 'username' | 'password'>) {
    super(init)
    this.name = init.name
    this.username = init.username
    this.password = init.password
  }

  @Property({ columnType: 'varchar(255)' })
  name: string

  @Property()
  @Unique()
  username!: string

  @Property()
  password: string

}
