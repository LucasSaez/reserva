import { ReservaEntity } from "src/sistema-reserva/reservas/entities/reserva.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity('departamentos')
export class DepartamentoEntity {

    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column({
        type: 'int',
        default: 0,
        nullable: false
    })
    nroDepartamento: number;

    @Column({
        type: 'varchar',
        nullable: true
    })
    descripcion: string;

    //*un departamento puede tener maximo 2 reservas
    @OneToMany(
        () => ReservaEntity,
        (reserva) => reserva.departamento
    )
    reserva: ReservaEntity;


    
}