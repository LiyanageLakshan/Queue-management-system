import { Server as HTTPServer } from 'http';
import { Socket, Server } from 'socket.io';
import {v4} from 'uuid';

export class serverSocket {
    public static instance: serverSocket;

    public io: Server;

    // list of all connected useres

    public users: {[uid: string]: string};

    constructor(server: HTTPServer) {
        serverSocket.instance = this;
        this.users={};
        this.io = new Server(server,{
            serveClient: false,
            pingInterval: 10000,
            pingTimeout: 5000,
            cookie: false,
            cors: {
                origin:'*'
            }
        });

        this.io.on('connect', this.StartListeners);

        console.info('Socket IO started.');
    }


    StartListeners =(socket: Socket) =>{

        console.info('Message received from' + socket.id);

        socket.on('handshake',() => {
            console.info('Handshake received frorm '+ socket.id);

        });

        socket.on('disconnect',() => {
            console.info('Disconnect received from' + socket.id);
        });

    };


}
