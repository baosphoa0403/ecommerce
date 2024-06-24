import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { ProductEntity } from '../../product/entities/product.entity';

@Entity("catalogs")
export class CatalogEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  parentId: string

  @OneToMany(()=> ProductEntity, product => product.catalogEntity)
  productEntities: ProductEntity[]
}
