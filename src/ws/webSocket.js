import ws from 'ws';
import jwt from 'jsonwebtoken';
const wss = new ws.Server({port:process.env.WS_PORT});

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

// wss.on('connection', function connection(ws) {
//
// });


wss.on('connection', function connection (ws) {

  ws.on('message', function incoming (data) {
    console.log(`Roundtrip time: ${Date.now()} ms`);

    console.log('received:',data)
    ws.token = data;
  })

  ws.isAlive = true;

  ws.on('pong', heartbeat);

  ws.on('close', function close() {
    console.log('disconnected');
     jwt.verify(ws.token, process.env.SECRET_KEY, (err, token)=>{
       console.log("This client is disconnected");
       console.log(token);
       wss.clients.forEach((el)=>{el.send(JSON.stringify({type:"message",message:"user id dead",token:token})
           )});
       });
     })

});




const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) {
     jwt.verify(ws.token, process.env.SECRET_KEY, (err, token)=>{
        console.log("This client is dead");
        console.log(token);
        wss.clients.forEach((el)=>{el.send(JSON.stringify({type:"message",message:"user id dead",token:token}))});
      });
      return ws.terminate()};
    ws.isAlive = false;
    ws.ping(noop);
    console.log(ws.token);
    console.log("he's alive");
  });
}, 15000);

export default wss ;
