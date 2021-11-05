---
sidebar_position: 2
---

# Messages

Messages are the standard communication format for all data moving in and out of WorldQL. Operations such as establishing a connection, updating player position/animation, and modifying the world are all done through Messages. They are encoded using a [single Flatbuffer schema](https://github.com/WorldQL/flatbuffer-schema/blob/main/flatbuffer/WorldQLFB.fbs).


Messages have the following fields:
1. [Instruction](./instructions): Denotes the type of message being sent. Tells the client/server how to interpret the contained data.
2. Parameter: A single general purpose string payload. Can be used for whatever data is desired. You can specify a generic string argument, target object ID, etc.
3. Sender UUID: The client ID that sent the message. Only used for serverbound messages.
4. World name: The [World](./worlds) that the message is referring to.
5. Records: An array of [Records](#) representing permanent objects in the world. Used in both server-bound messages (i.e. creating a new record) and client-bound messages (telling the client about a certain Record).
6. Entities: An array of Entities representing living, moving objects in the world. Entities are similar to Records, but are stored only in memory and never written to disk. They are support having Scripts attached to them.
7. Position: A 3D vector representing the target position of this Message.
8. Flex: A byte array that can be used to pass whatever data the developer desires. You can use any serialization format you want, but [Flexbuffers](https://google.github.io/flatbuffers/flexbuffers.html) are strongly recommended for their speed and inclusion in the Flatbuffer library.

:::tip

Confused by what _Records_, _Worlds_, and _Entities_ are? Don't worry, we'll explain all of that on the following pages.

:::