import ws from 'ws';
import wss from './webSocket';

export function clientAdd(userData){
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({type: 'add' , client: userData}));
    }
  });
}

export function clientEdit(userData){
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({type: 'edit' , client: userData}));
    }
  });
}

export function clientDelete(id){
  wss.clients.forEach(function each(client) {
    if (client.readyState === ws.OPEN) {
      client.send(JSON.stringify({type: 'delete', id}));
    }
  });
}
