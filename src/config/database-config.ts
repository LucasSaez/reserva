import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { envs } from "./envs";

export const db: TypeOrmModuleOptions={
    type: 'mysql',
    host: envs.host,
    port: envs.db_port,
    username: envs.user,
    password: envs.pass,
    database: envs.database,
    entities: [],
    autoLoadEntities: true,
    synchronize: true
}