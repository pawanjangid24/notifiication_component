require('./db/mongoose')
const fs = require('fs');
const readline = require('readline')
const Order = require('./model/order')


const rl = readline.createInterface({
    input: fs.createReadStream('./input.txt'),
    output: process.stdout
})


const init = () => {
    return new Promise((resolve, reject) => {
        var lineNo = 0;

        const orderObj = {}
        rl.on('line', async(input) => {
            lineNo++;
            input = input.split(' ');
            switch(input[0]) {
                case 'name':
                    orderObj.customerName = input[1] + " " + input[2]
                    break;
                case 'time':
                    orderObj.orderTime = input[1]
                    break;
                case 'source':
                    orderObj.orderSource = input[1]
                    break;
                case 'value':
                    orderObj.orderValue = input[1]
                    break;
                case 'items':
                    var items = input[1].split(',')
                    var temp = []
                    items.forEach(item => {
                        temp.push(item)
                    })
                    orderObj.items = temp
                    break;
                case 'delivery':
                    orderObj.expectedDelivery = input[1]
                    break;
            }
            resolve(orderObj)       
        })
        
    })
}

const dbNotification = async() => {
    console.log('inside db notification')
    const orderInfo = await init();
    console.log(orderInfo)

    const order = new Order(orderInfo);

    await order.save();

    console.log('order is inserted into db')
}

dbNotification()