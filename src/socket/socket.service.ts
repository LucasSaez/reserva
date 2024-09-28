import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { Payload } from 'src/common/dtos/payload.dto';

@Injectable()
export class SocketService {

    private clients: {[key:string]: {socket: Socket; payload: Payload}} = {};
    onConnection(socket: Socket, payload: Payload){
        this.clients[socket.id] = {socket: socket, payload: payload};
    }
    onDisconnect(socket: Socket){
        delete this.clients[socket.id]
    }

    getSocket(id:number){
        //*recorremos la lista objeto valor
        for (let key in this.clients){
            //*retornamos el valor
            if(this.clients[key].payload.sub == id) return this.clients[key];
            //* o si no existe tal usuario,retornar nulo
            else return null;
        }
    }


}