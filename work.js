const reqprom = require('request-promise');
let cont = true;
let start = Date.now();

async function doRequests(limit) {
    let response;
    console.log((Date.now() - start) + ' worker is doing requests');
    for (let index = 0; index < limit && cont; index++) {
        console.log((Date.now() - start) + ' worker request ' + index);
        response = await reqprom('https://httpbin.org/get?foo=bar');
        console.log((Date.now() - start) + ' worker http received: ' + JSON.parse(response).args.foo);
    }
}


// receive message from master process
process.on('message', async (message) => {

    console.log((Date.now() - start) + ' worker received:' + JSON.stringify(message));
    if (message.limit) {
        doRequests(message.limit);
    }

    if (message.stop) {
        console.log((Date.now() - start) + ' worker I\'m stopping');
        cont = false;
        process.exit(0);
    }
});