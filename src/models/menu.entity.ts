import {
    BaseEntity, Entity, Column, PrimaryGeneratedColumn, ManyToOne
} from "typeorm"

import { User } from "./user.entity"


@Entity()
export class Menu extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number


    @Column()
    name: string


    @Column()
    user_id: number


    // @ManyToOne(() => User, (user) => user.menus, { onDelete: "CASCADE" })
    // user: User

}
