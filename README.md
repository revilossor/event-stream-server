# Event Sourcing Thing

This is a node app that acts as an 'event stream' server for event sourcing architecture.

The app connects to a mongoDB instance to store events, uses websockets to receive and forward events, and is a a graphQL server for getting stored events.

There is a client lib that connects to this and handles most of the aggregate stuff [here](https://github.com/revilossor/rahv-client)

query events (on /query) like this

```
{
  getEvents(selector:{aggregateId:"aggregateId", version:10}) {
    aggregateId
    data
    version
  }
}
```

Connect to the socket server ( on /events ) like this ( using [ws](https://www.npmjs.com/package/ws) )

```
const WebSocket = require('ws');

const ws = new WebSocket('ws://www.host.com/events');

ws.on('open', () => {
  ws.on('message', (data) => {
    console.log(data);
  });
});

```
