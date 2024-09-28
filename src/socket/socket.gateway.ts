import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketService } from './socket.service';
import { AuthService } from 'src/usuarios/auth/auth.service';

@WebSocketGateway()
export class SocketGateway implements OnModuleInit {

  constructor(
    private readonly socketService: SocketService,
    private readonly auth: AuthService
  ){}
  
  @WebSocketServer()
  server: Server;

  clients: {[key:string]: {socket: Socket}} = {};
  
  onModuleInit() {
    this.server.on('connection', async(socket: Socket) => {

      try {

        const payload = await this.auth.verifyJwt(
          socket.handshake.headers.authorization,
        );

        console.log(`usuario conectado con id: ${socket.id}`);

        this.server.emit(
          'welcome-message',
          `Bienvenido a nuestro servidor, usuario ${socket.id}`
        );


        this.socketService.onConnection(socket, payload);

        socket.on('disconnect', () => {
          console.log(`usuario desconectado con id: ${socket.id}`);

          this.socketService.onDisconnect(socket)
        })

        const socketUsuario = this.socketService.getSocket(
          +socket.handshake.headers['usuario'],
        );
        
        if(socketUsuario){
          socketUsuario.socket.emit(
            `El usuario: ${payload.nombre} establecio una conexion!`
          )
        }

        
      } catch (error) {

        socket.disconnect();

        throw new UnauthorizedException('informacion incorrecta')
        
      }
    })

    
  }
  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }
}