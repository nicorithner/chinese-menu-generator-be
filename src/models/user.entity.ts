import {
    BaseEntity, Entity, Column, PrimaryGeneratedColumn, OneToMany
} from "typeorm"

import { Menu } from "./menu.entity"


@Entity()
export class User extends BaseEntity {


    @PrimaryGeneratedColumn()
    id: number


    @Column()
    firstName: string


    @Column()
    lastName: string

    @OneToMany(() => Menu, (menu) => menu.user, {
        cascade: true,
    })
    menus: Menu[]
}
