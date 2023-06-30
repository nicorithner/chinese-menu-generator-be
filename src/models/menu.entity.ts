import {
    BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable
} from "typeorm"

import { User } from "./user.entity"
import { Recipe } from "./recipe.entity"


@Entity()
export class Menu extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    user_id: number

    @ManyToOne(() => User, (user) => user.menus, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: 'user_id' })
    user: User

    @ManyToMany(() => Recipe)
    @JoinTable()
    recipes: Recipe[];
}
