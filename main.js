const { fork } = require('child_process');
const proc = fork('work.js');
const start = Date.now();

console.log((Date.now() - start) + ' main before limit');
proc.send({ limit: 100 });

console.log((Date.now() - start) + ' main after limit');

proc.on('message', (message) => {
    console.log((Date.now() - start) + ' main received: ' + JSON.stringify(message.message));
});

setTimeout(stopToSign, 10000);

function stopToSign() {
    console.log((Date.now() - start) + ' main before stop');
    proc.send({ stop: true });
    console.log((Date.now() - start) + ' main after stop');
}