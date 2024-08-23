import { ENTITIES } from "src/common/data";
import { IdEntity } from "src/common/entities/id.entity";
import {
    Column,
    Entity
} from "typeorm";

@Entity({ name: ENTITIES.CATEGORIES })
export class Category extends IdEntity {
    @Column({ type: "varchar", length: 50,unique: true })
    name: string

    @Column({ name: "image_url", nullable: true })
    imageUrl?: string
}