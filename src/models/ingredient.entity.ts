import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  name: string;
}
