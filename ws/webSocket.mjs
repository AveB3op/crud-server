import ws from 'ws';


const wss = new ws.Server({port:40510});

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
  })
})

export default wss ;
