import {
  BaseEntity,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Ingredient } from "./ingredient.entity";

@Entity()
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column("varchar", { length: 10000 })
  description: string;

  @Column("varchar", { length: 1000 })
  instructions: string;

  @ManyToMany(() => Ingredient, (ingredient) => ingredient.recipes)
  @JoinTable()
  ingredients: Ingredient[];
}
