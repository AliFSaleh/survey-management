import { PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "./base.entity";

export class IdEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;
}
