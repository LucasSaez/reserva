import { IngresoEntity } from "src/sistema-reserva/ingresos/entities/ingreso.entity";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { Column, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ParcelaStatus {
    PENDIENTE = 'PENDIENTE',
    OCUPADA = 'OCUPADA',
    APROBADA ='APROBADA',
    DESAPROBADA ='DESAPROBADA',
    LIBRE = 'LIBRE'
}

@Entity('parcelas')
export class ParcelaEntity {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
        type: 'varchar',
        nullable: false,
        length: 50
    })
    nombreParcela: string;

    // @Column({
    //     type: 'varchar',
    //     nullable: true,
    //     length: 50
    // })
    // descripcion: string;

    // @Column({
    //     type: 'int',
    //     nullable: false
    // })
    // precio: number;

    // @Column({
    //     type: 'uuid',
    //     nullable: false,
    //     unique: true,
    //     generated: 'uuid'
    // })
    // codigoUnico: number;

    @Column({
        type: 'enum',
        enum: ParcelaStatus,
        default: ParcelaStatus.PENDIENTE
    })
    estado: ParcelaStatus;


    
    // @OneToOne(
    //     () => IngresoEntity,
    //     (ingreso) => ingreso.usuario.id
    // )
    // ingresoUsuario: IngresoEntity;

    //*una parcela tiene muchos ingresos, pero vamos a mostrar el id del usuario
    @OneToMany(
        () => IngresoEntity,
        (ingreso) => ingreso.parcela
    )
    ingreso: IngresoEntity;

    // @ManyToOne(
    //     () => Usuarios,
    //     (usuario) => usuario.parcela,
    //     // {eager: true}
    // )
    // usuario: Usuarios

}