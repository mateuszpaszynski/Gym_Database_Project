
const {EventEmitter} = require('events')
const eventEmitter = new EventEmitter();
eventEmitter.on('lunch',()=>
{
    console.log('xd');
})
eventEmitter.emit('lunch');