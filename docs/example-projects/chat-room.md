---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# WorldQL 101 - A chatroom and shared canvas over WebSockets in the browser

Use WorldQL to build a simple chat room where you can see the cursors of other users.

:::danger Work in progress!
We're hard at work building. Documentation on this example project is still a work in progress and subject to change!
:::

## Setup and Prerequisites
WorldQL has a client written in TypeScript for use on the web, which can be found at https://npm.im/@worldql/client.
You can either use JavaScript or TypeScript for this example, but TypeScript is recommended. You will also need a
module bundler, such as [Webpack](https://webpack.js.org/) or [Parcel](https://parceljs.org/), to bundle your JS/TS
code up with all dependencies for use on the web.

Once setup, simply install the client with your choice of package manager.
```bash npm2yarn
npm install @worldql/client
```

Finally, you will need a WorldQL server instance. For development accessing via `localhost` is fine. However on production websites
you will need to expose the WorldQL WebSocket to the internet and ensure everything is setup correctly. This kind of production
scale setup is out of the scope of this article however.

## Syncing Chat
A chatroom has two requirements, to send messages out to other clients, and to receive messages from other clients. WorldQL acts as
the message broker and ensures every client can talk to each other.

To start, you will need some way for the user to interact with your application; a textbox for writing messages and a button for sending.
```html
<input type='text' id='text-input' />
<button type='button' id='text-send'>SEND</button>
```

Next you will need to add references in your JS/TS module. If you don't have a JS/TS entrypoint simply add a
`<script type='module'></script>` tag.

```md codetabs
```js
const input = document.getElementById('text-input')
const button = document.getElementById('text-send')
```ts
const input = document.getElementById<HTMLInputElement>('text-input')
const button = document.getElementById<HTMLButtonElement>('text-send')
```

From there you will need to add an event listener to the button to detect clicks. This will then read and clear the text in the input
textbox, and pass the text through WorldQL to other clients.
```ts
// On SEND clicked
button.addEventListener('click', () => {
  // Read input text
  const text = input.value

  // Clear input text
  input.value = ''

  // ...
})
```

Next we will need to interact with WorldQL using the client.
```ts
import { Client } from '@worldql/client'

// Ensure your WS URL is correct
const client = new WorldQLClient({ url: 'ws://localhost:8080' })
client.connect()
```

You will need to wait for the client to connect to WorldQL before attempting to send any data. Luckily the client will emit an event
when it is connected and ready! It also has a read-only boolean property named `ready` that you can check at any time.

:::caution Warning
Attempting to send messages via the client before it is ready will result in the client throwing an Error.
:::

```ts
// Subscribe to `ready` event
client.on('ready', () => {
  // ... handle ready ...
})

// Check ready property
const isReady = client.ready
```

You could use this ready event to control the `disabled` state of the input textbox and send button to stop users from being able
to interact with them before the client is ready.

```ts
// Disable inputs on page load
input.disabled = true
button.disabled = true

// Enable inputs once client is ready
client.on('ready', () => {
  input.disabled = false
  button.disabled = false
})
```

Now that the client is connected and ready to send messages, you can use the `client` object to send a global message. You can use
your IDE to inspect the arguments to `globalMessage()`, but for the sake of this example project we will go over them one by one.

| Name | Type | Required | Usage |
| - | - | - | - |
| `worldName` | `string` | Yes | World to send message to |
| `payload` | `object` | No | Optional extra payload, replicated to any listening clients |
| `payload.parameter` | `string` | No | Arbitrary string value |
| `payload.flex` | [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | No | Arbitrary binary data |

The `payload` object is used to send arbitrary data to other clients, usually application state of some form. The `parameter`
payload is a simple string, which can be used to encode instructions or simple data. The `flex` payload is binary, meaning it
can take any data as an input. This could be a complex packed binary representation of your application state, or it could simply
be UTF8 encoded JSON; the choice is left entirely up to the user.

```ts
// On SEND clicked
button.addEventListener('click', () => {
  const text = input.value
  input.value = ''
  // ... code above is from before

  // Ensure the client is ready, otherwise return early
  if (!client.ready) return

  // Send global message with the text as a payload
  client.globalMessage('chat', { parameter: text })
})
```

<!-- TODO: Subscribe to world -->

Now that we are setup to send messages, we need to handle the other end and receive messages. The WorldQL client is an event emitter, so
all you need to do is subscribe to the `globalMessage` event. It isn't important in this example since you are only subscribing to one
world, but in the event you are subscribing to multiple worlds on the same client you will need to remember to filter based on world name.

```ts
// Subscribe to global messages
client.on('globalMessage', (senderUuid, worldName, { parameter }) => {
  // Filter out messages from other worlds
  if (worldName !== 'chat') return

  // ... handle incoming message ...
})
```

## Syncing Cursors
:::danger Coming Soon
This section of the documentation is coming soon!
:::

<!-- ## Example Project -->
<!-- TODO: Link src and hosted version of React example project -->
