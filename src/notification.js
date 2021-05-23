const mongoose = require('mongoose')
const Order = require('./model/order')
const { ReplSet } = require('mongodb-topology-manager')
require('./db/mongoose')
const express = require('express')
const app = express()
const io = require('socket.io')

const http = require('http').Server(app)

const port = 500

const socket = io(http)

http.listen(port, () => {
    console.log('connected to port: '+port)
})

socket.on('connection', (socket) => {
    console.log('user connected')

    socket.on('sendMessage', (message, callback) => {
        console.log(message)
        
        socket.emit('message', message)

        callback(message)
    })
})

async function notificationAlert() {

    // await setupReplicaSet()

    // const uri = 'mongodb://localhost:27017,localhost:27018,localhost:27019/' + 'notification-management?replicaSet=rs0';
    // await mongoose.connect(uri)
    
    setInterval(() => {  
        console.log('listen event every 2 sec')
        const orderEventEmitter = Order.watch()
        
        orderEventEmitter.on('change', change => {
            console.log('There is a change in order')
        
            console.log(JSON.stringify(change));
        })
    }, 2000);
}

// async function setupReplicaSet() {
//     const bind_ip = 'localhost';
    
//     const replSet = new ReplSet('mongod', [
//       { options: { port: 27017, dbpath: `C:\\Users\Lenovo\mongodb-data\27017`, bind_ip } }
//     //   { options: { port: 27018, dbpath: `C:\\Users\Lenovo\mongodb-data\31001`, bind_ip } },
//     //   { options: { port: 27019, dbpath: `C:\\Users\Lenovo\mongodb-data\31002`, bind_ip } }
//     ], { replSet: 'rs0' });
  

//     await replSet.purge();
//     await replSet.start();
//     console.log(new Date(), 'Replica set started...');
// }


notificationAlert().catch(err => {
    console.log(err)
})