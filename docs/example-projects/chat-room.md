---
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# WorldQL 101 - A Chatroom and Shared Canvas over Websockets in the Browser

Use WorldQL to build a simple chat room where you can see the cursors of other users.

:::danger Work in progress!
We're hard at work building. Documentation on this example project is still a work in progress and subject to change!
:::

:::note
Want more general examples? Check out the [TypeScript Client](../client-libraries/typescript.md) page for setup
instructions and smaller example code snippets.
:::

## Setup and Prerequisites
Please refer to the [TypeScript Client Library](../client-libraries/typescript.md#installation-and-setup) page
for information on how to setup the client.

To follow along, you will need a WorldQL server instance. For development, running locally and accessing via `localhost`
is fine. However on production websites you will need to expose the WorldQL WebSocket to the internet and ensure everything
is setup correctly. This kind of production scale setup is out of the scope of this article however.

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
```ts
const input = document.getElementById('text-input') as HTMLInputElement
const button = document.getElementById('text-send') as HTMLButtonElement
```js
/** @type {HTMLInputElement} */
const input = document.getElementById('text-input')
/** @type {HTMLButtonElement} */
const button = document.getElementById('text-send')
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
| `replication` | `enum` | No | Replication strategy |
| `payload` | `object` | No | Optional extra payload, replicated to any listening clients |
| `payload.parameter` | `string` | No | Arbitrary string value |
| `payload.flex` | [`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array) | No | Arbitrary binary data |

The `payload` object is used to send arbitrary data to other clients, usually application state of some form. The `parameter`
payload is a simple string, which can be used to encode instructions or simple data. The `flex` payload is binary, meaning it
can take any data as an input. This could be a complex packed binary representation of your application state, or it could simply
be UTF8 encoded JSON; the choice is left entirely up to the user.

```ts
import { Replication } from '@worldql/client'

// On SEND clicked
button.addEventListener('click', () => {
  const text = input.value
  input.value = ''
  // ... code above is from before

  // Ensure the client is ready, otherwise return early
  if (!client.ready) return

  // Send global message with the text as a payload
  // Use replication strategy of ExceptSelf to send to all other clients
  client.globalMessage('chat', Replication.ExceptSelf, { parameter: text })
})
```

Now that we are setup to send messages, we need to handle the other end and receive messages. The WorldQL client is an event emitter, so
all you need to do is subscribe to the `globalMessage` event. If you are sending/receiving to/from multiple worlds then you will need
to remember to filter based on the incoming `worldName` parameter, but for this example we are only using the one world so this isn't
strictly necessary.

```ts
// Subscribe to global messages
client.on('globalMessage', (senderUuid, worldName, { parameter }) => {
  // Filter out messages from other worlds
  if (worldName !== 'chat') return

  // ... handle incoming message ...
})
```

However, this won't work just yet. WorldQL only passes messages to clients which have subscribed to a world, or areas inside a world in
the case of local messages. To receive global messages, you must subscribe to at least one region in a world.

```ts
// Subscribe to origin region
client.areaSubscribe('world', { x: 0, y: 0, z: 0 })
```

Once we are subscribed to the world, we will need to actually process the incoming messages. For this example, we will store the message
content and sender UUID in an array of tuples and then printing the array to the console. We won't go over displaying the messages in the
DOM, as that has been left as an extension task for you to complete yourself.

```md codetabs
```ts
// Define an array to store messages
const messages: Array<[uuid: string, text: string]> = []

button.addEventListener('click', () => {
  const text = input.value
  input.value = ''
  
  if (!client.ready) return
  client.globalMessage('chat', { parameter: text })
  // ... code above is from before

  // Store own message in array
  messages.push([client.uuid, text])

  // Print outgoing message to console
  console.log(`> ${senderUuid}: ${parameter}`)
})

client.on('globalMessage', (senderUuid, worldName, { parameter }) => {
  if (worldName !== 'chat') return
  // ... code above is from before

  // Store message in array
  messages.push([senderUuid, parameter])

  // Print incoming message to console
  console.log(`< ${senderUuid}: ${parameter}`)
})
```js
// Define an array to store messages
/** @type {Array<[uuid: string, text: string]>} */
const messages = []

button.addEventListener('click', () => {
  const text = input.value
  input.value = ''
  
  if (!client.ready) return
  client.globalMessage('chat', { parameter: text })
  // ... code above is from before

  // Store own message in array
  messages.push([client.uuid, text])

  // Print outgoing message to console
  console.log(`> ${senderUuid}: ${parameter}`)
})

client.on('globalMessage', (senderUuid, worldName, { parameter }) => {
  if (worldName !== 'chat') return
  // ... code above is from before

  // Store message in array
  messages.push([senderUuid, parameter])

  // Print incoming message to console
  console.log(`< ${senderUuid}: ${parameter}`)
})
```

At this point you should have a fully functioning chat example. It isn't pretty and the only way to see chat messages is by opening the
JavaScript console, but it does work as expected. If you are feeling ambitious, take a look at the extension tasks below. These are
pointers on how you can extend this example project to a more functional real-world application.

### Extension Tasks
* Make UI for the user to set their own username
* Pass both the username and message text to WorldQL
* Display the username and text in the HTML DOM
* Use the `peerConnect` and `peerDisconnect` events to display every connected client
* Use the `peerConnect` and `peerDisconnect` events to display messages when a client joins/leaves the chatroom

## Syncing Cursors
:::danger Coming Soon
This section of the documentation is coming soon!
:::

<!-- ## Example Project -->
<!-- TODO: Link src and hosted version of React example project -->
