import { Exclude } from "class-transformer";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseEntity {
  @Exclude()
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at!: Date;

  @Exclude()
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updated_at!: Date;
}
