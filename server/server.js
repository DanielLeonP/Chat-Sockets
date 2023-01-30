var net = require('net');
var sockets = new Array();
/*
    1.- aceptar conexiones a un puerto determinador
    2.- control de todas las personas conectadas
    3.- mandar mensaje a todas las personas cuando alguien se conecte, alguien salga o envie un mensaje.
*/

function enviaMensaje(mensaje){
    for (var i = 0; i < sockets.length; i++){
        sockets[i].write(mensaje);
    }
}

function posicionSocket(socket){
    for (var i = 0; i < sockets.length; i++){
        if (sockets[i] == socket){
            return i;
        }            
    }
    return null;
}

function inicio(socket){
    socket.on('data', (data)=>{
        peticion = data.toString('utf-8');
        //console.log(data.toString());
        peticion = peticion.replace(/[^A-Za-z0-9.@\^\-\s]/g, "");
        tokens = peticion.split('^');
        msg = '';
        if (tokens[0] == 'j'){
            msg = 'm^server@127.0.0.1^-^' + tokens[1].split('@')[0] + ' join from ' + tokens[1].split('@')[1] + ' \n\n';
        }else if (tokens[0] == 'p'){
            pos = posicionSocket(socket);
            if (pos != null){
                sockets.splice(pos,1);
            }            
            msg = 'm^server@127.0.0.1^-^' + tokens[1].split('@')[0] + ' part from ' + tokens[1].split('@')[1] + ' \n\n';
        } else {            
            msg = peticion;
        }
        enviaMensaje(msg)
        console.log(msg); //manda un mensaje al cliente
    });
}


const server = net.createServer((socket) =>{
    sockets.push(socket);
    inicio(socket); 

}).on('error', (err) => {
    throw err;
}) 

server.listen(1090, 'localhost', () => console.log('Servidor Chat Activo'));

// net = require('net');

// var clients = [];//usuarios del chat

// //crear server
// const server = net.createServer(function (socket) {
//     //identificacion de cliente
//     socket.name = socket.remoteAddress//falta agregar el nombre del cliente
    
//     //agrega a clients
//     clients.push(socket);
//     socket.write('Bienvenido al chat!')
//     //entrada de cliente
//     enviarATodos("j ^ @" + socket.name + " ^ " + socket.remotePort + " ^  Se unio al chat\n", socket);

//     //llegada de mensaje
//     socket.on('data', function (data) {
//         enviarATodos("m ^ @" + socket.name + " ^ "+ socket.remotePort + " ^ "+ data, socket);
//     });

//     socket.on('end', function () {//salida de cliente
//         clients.splice(clients.indexOf(socket), 1);
//         enviarATodos('p ^ @' +socket.name + " ^ _ ^ Dejo el chat ^ \n");
//     });

//     //funcion mensaje a todos los clientes
//     function enviarATodos(message, sender) {
//         clients.forEach(function (client) {
//             // No enviar el mensaje al cliente que escribe
//             if (client != sender){
//                 client.write(message);
//             }            
//         }); 
//         // mostrar en server
//         console.log(message)
//     }

// }).listen(5000, ()=>{
//     console.log('El servidor de chat esta escuchando en la puerta', server.address().port)
// })
