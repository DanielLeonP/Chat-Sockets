const net = require('net');
const readline = require('readline-sync');

var line

const options = {
    port: 1090,
    host: '127.0.0.1'
}
const client = net.createConnection(options)

var nombre = readline.question('\nNombre: ');
var direccion;
var puerto;

var activo = true;

client.on('connect', ()=>{        
    direccion = client.localAddress;
    puerto = client.localPort;  
    client.write('j^' + nombre + '@' + direccion + '^' + puerto + '^-^');
    enviarMensaje();  
})
function enviarMensaje() {
    while(activo == true){
        line = readline.question('\nDigitar mensaje: ')
        msg = 'm^' + nombre + '@' + direccion + '^' + puerto + '^' + line + '^';
        if(line != "0"){
            client.write(msg)
        }else{
            msg = 'p^' + nombre + '@' + direccion + '^-^-^';
            client.write(msg)
            client.end()
            activo = false;
        }            
    }  
}
client.on('data', (data)=>{      
    //console.log(data.toString());
})


client.on('error', (err)=>{
    console.log(err.message)
})
client.on('end', () => {
    console.log('Desconectado del chat');
});







// const net = require('net');
// const readline = require('readline-sync');

// var line

// const options = {
//     port: 5000,
//     host: '127.0.0.1'
// }
// const client = net.createConnection(options)

// var activo = true;

// client.on('connect', ()=>{
//     console.log('Conexión satisfactoria al chat!')    
// })

// client.on('data', (data)=>{  
//     while(activo == true){
//         line = readline.question('\nDigitar mensaje: ')
//         if(line != "0"){
//             client.write(line)
//         }else{
//             client.end()
//             activo = false;
//         }         
//     }       
// })

// client.on('error', (err)=>{
//     console.log(err.message)
// })