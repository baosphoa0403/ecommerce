import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from '@ecommerce/libs';

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({type: "date"})
  dateOfBirth: Date;

  @Column({enum: GenderEnum, type: "enum", default: GenderEnum.MALE})
  gender: GenderEnum;

  @Column()
  nationalId: string

  @Column()
  phone: string

  @Column()
  password: string

  @Column()
  email: string
}
