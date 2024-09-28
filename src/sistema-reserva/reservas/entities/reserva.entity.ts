import { DepartamentoEntity } from "src/sistema-reserva/departamentos/entities/departamento.entity";
import { Usuarios } from "src/usuarios/entity/usuarios.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum ReservaStatus {
    PENDIENTE = 'PENDIENTE',
    APROBADA = 'APROBADA',
    DESAPROBADA = 'DESAPROBADA'
}


@Entity('reservas_deptos')
export class ReservaEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        type: 'date',
        
    })
    fechaEntrada: Date;

    @Column({
        type: 'date',
        nullable: false
    })
    fechaSalida: Date;

    @Column({
        type: 'enum',
        enum: ReservaStatus,
        default: ReservaStatus.PENDIENTE
    })
    estado: ReservaStatus;


    //*muchas reservas un solo departamento(se puede reservar hasta dos reservas en un mismo departamento)
    @ManyToOne(
        () => DepartamentoEntity,
        (depto) => depto.reserva
    )
    departamento: DepartamentoEntity


    @ManyToOne(
        () => Usuarios,
        (usuario) => usuario.id
    )
    usuario: Usuarios;

}