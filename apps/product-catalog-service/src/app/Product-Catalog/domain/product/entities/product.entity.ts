import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {CatalogEntity} from "../../catalog/entities/catalog.entity";


@Entity("products")
export class ProductEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  description: string

  @Column({type: "decimal", precision: 10, scale: 2})
  price: number

  @Column({name: "catalog_id"})
  catalogId: string

  @ManyToOne(()=> CatalogEntity, catalog =>  catalog.productEntities)
  @JoinColumn({name: "catalog_id", referencedColumnName: "id"})
  catalogEntity: CatalogEntity;
}
