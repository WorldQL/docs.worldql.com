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

<Tabs>
<TabItem value="js" label="JavaScript">

```js
const input = document.getElementById('text-input')
const button = document.getElementById('text-send')
```

</TabItem>
<TabItem value="ts" label="TypeScript">

```ts
const input = document.getElementById<HTMLInputElement>('text-input')
const button = document.getElementById<HTMLButtonElement>('text-send')
```

</TabItem>
</Tabs>

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

<!-- TODO -->
<!-- * send messages
  * use json
  * note about messagepack -->

## Syncing Cursors
:::danger Coming Soon
This section of the documentation is coming soon!
:::

<!-- ## Example Project -->
<!-- TODO: Link src and hosted version of React example project -->
