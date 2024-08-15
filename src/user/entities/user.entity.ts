import { Exclude } from "class-transformer";
import { ENTITIES } from "src/common/data";
import { IdEntity } from "src/common/entities/id.entity";
import { BeforeInsert, Column, Entity } from "typeorm";
import { RoleEnum } from "../enums/role.enum";
import { hashPasswordWithSaltAndPepper } from "src/utils/auth.utils";


@Entity({ name: ENTITIES.USERS })
export class User extends IdEntity {
    @Column({ unique: true })
    email: string;

    @Column({ type: 'varchar', length: 50 })
    name: string;
    
    @Exclude()
    @Column()
    password?: string;

    @Column({
        type: 'enum',
        enum: RoleEnum,
        default: RoleEnum.USER
    })
    role: RoleEnum

    @Exclude()
    @Column({ name: "access_token", nullable: true })
    accessToken?: string;

    @BeforeInsert()
    async hashPassword() {
        this.password
        ? (this.password = await hashPasswordWithSaltAndPepper(this.password))
        : null;
    }
}