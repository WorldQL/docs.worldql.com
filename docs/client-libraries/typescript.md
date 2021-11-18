---
sidebar_position: 1
---

# TypeScript
:::danger Work in progress!
We're hard at work building. This page is still a work in progress and subject to change!
:::

## Installation and Setup
The TypeScript client is published to NPM and can be found at https://npm.im/@worldql/client. Both JavaScript and TypeScript
are supported as type definitions are included, but we recommend TypeScript for the additional type safety it brings.

Both Browsers and [Node.js](https://nodejs.org/) are supported, but for browsers you will need a module bundler, such as
[Webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/).

:::caution Warning
The library is using the ECMAScript Module (ESM) spec, which means it is not compatible with older CommonJS runtimes.
If you are using a module bundler this likely won't be a problem, but on Node.js you will need to be using ESM yourself.

See [this gist](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) for more information about ESM.
:::

To use, simply install the library with your package manager of choice.
```bash npm2yarn
npm install @worldql/client
```

### Client Options
The client requires the `url` option to be set, which should be the full WebSocket URL of your WorldQL instance. Over localhost
with the default port this will be `ws://localhost:8080`, but for production deployments you will need to set this to wherever
your WorldQL instance is reachable.

The client also has an `autoconnect` boolean option, which implicitly calls `.connect()` on instantiation.
For all code snippets below, please assume that `autoconnect` is set.

```ts
// Import library
import { Client } from '@worldql/client'

// Instantiate Client
const client = new Client({ url: 'ws://localhost:8080', autoconnect: true })

/// ... application logic
```

## Code Samples
### Connect to WorldQL and log client's UUID
```ts
const client = new Client({ ... })
client.on('ready', () => {
  console.log(`My UUID is ${client.uuid}`)
})
```

### Log UUIDs for peers connecting and disconnecting from WorldQL
```ts
const client = new Client({ ... })

client.on('peerConnect', uuid => {
  console.log(`Peer connected: ${uuid}`)
})

client.on('peerDisconnect', uuid => {
  console.log(`Peer disconnected: ${uuid}`)
})
```

---

:::note Further Reading
Want a more in-depth look at how the TypeScript Client can integrate with a web project? Check out the
[Chat Room Example Project](../example-projects/chat-room.md) for a look into building a real-time
chatroom with a synced cursor canvas using WorldQL.
:::
