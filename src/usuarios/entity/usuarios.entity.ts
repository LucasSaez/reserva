//aca creamos el esquema de la base de datos, de nuestras tablas en la base de datos

import { IngresoEntity } from "src/sistema-reserva/ingresos/entities/ingreso.entity";
import { ParcelaEntity } from "src/sistema-reserva/parcelas/entities/parcela.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


export enum RoleStatus {
    ADMIN = 'ADMIN',
    USER = 'USER'
}

@Entity('usuarios')
export class Usuarios {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        type: 'varchar',
        nullable: true,
        length: 100
    })
    nombre: string;

    @Column({
        type: 'varchar',
        nullable: false,
        unique: true,
        length: 40
    })
    email: string;


    @Column({
        type: 'varchar',
        nullable: false,
        length: 100
    })
    password:string;

    @Column({
        type: 'bool',
        default: true
    })
    isActive:boolean;

    @Column({type: 'varchar',nullable: false,length:255})
    avatar:string;

    @Column({
        type: 'uuid',
        nullable: false,
        unique: true,
        generated: 'uuid'
    })
    codigoUnico: string;

    @Column({
       type: 'enum',
       enum: RoleStatus,
       default: RoleStatus.USER
    })
    role: RoleStatus;


   @OneToMany(
    () => IngresoEntity,
    (ingreso) => ingreso.usuario,
    
   )
   ingreso: ParcelaEntity

}