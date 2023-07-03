import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: "varchar"})
  category: string;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  steps: string;

  @Column()
  ingredients: string;
}
