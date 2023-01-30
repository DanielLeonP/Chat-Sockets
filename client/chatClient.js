const {Socket} = require('net');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

const chat = (host, port, user) => {
    const net = new Socket;
    net.connect({host, port});
    net.setEncoding('utf-8');
    net.on('connect', () => {
        console.log('connected');
        var txt = 'j^' + user + '@' + host + '^-^-^';
        net.write(txt);
    })
    net.on('data', (mensaje) => {
        console.log(mensaje);
    })
    // readline.on('line', (mensaje) => {
    //     if(mensaje == 'salir'){
    //         txt = 'p^' + user + '@' + host + '^-^-^';
    //         net.write(txt);
    //         net.close();
    //     }else{
    //         var txt = 'm^' + user + '@' + host + '^-^' + mensaje + '^';
    //         net.write(txt);
    //     }
    // })
    readline.on('line', (mensaje) => {
        var txt = 'm^' + user + '@' + host + '^-^' + mensaje + '^';
        if(mensaje == 'salir'){
            txt = 'p^' + user + '@' + host + '^-^-^';
        }
        net.write(txt);
    })
    net.on('close', () => {
        console.log('disconnected');
        //process.exit(0);
    })   
}

const main = () => {
    if(process.argv.length != 5){
        console.log('node chatNuevo ipserver puerto usuario');
        process.exit(0);
    }
    let[ , , host, port, user] = process.argv;
    port = Number(port);
    chat(host, port, user);
    //console.log(process.argv.length)
}
 
if(module === require.main){
    main();
}



// //Vista del chat como forma de cliente
// const net = require('net');

// const options = {
//     port: 1090,
//     host: '127.0.0.1'
// }

// const client = net.createConnection(options)

// client.on('connect', ()=>{
//     console.log('Vista del chat!')
// })

// client.on('data', (data)=>{
//     console.log(data.toString())
// })

// client.on('error', (err)=>{
//     console.log(err.message)
// })