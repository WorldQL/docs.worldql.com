---
sidebar_position: 7
---

# Instructions

For convenience, here's the [Message](./messages) and Record from [WorldQL's Flatbuffer schema](https://github.com/WorldQL/flatbuffer-schema/blob/main/flatbuffer/WorldQLFB.fbs):
```
table Record {
    uuid:string;
    position:Vec3d;
    world_name:string;
    data:string;
    flex:[ubyte];
}

table Message {
    instruction:Instruction;
    parameter:string;
    sender_uuid:string;
    world_name:string;
    records:[Record];
    entities:[Entity];
    position:Vec3d;
    flex:[ubyte];
}
```

:::caution This page is a work in progress!

While this page contains an exhaustive list of instructions implemented by WorldQL, it lacks code samples. **This article will be updated with usage examples for each instruction soon.**
:::

## Heartbeat
Sent by the client periodically to let the server know it's still alive. Must contain a `sender_uuid`.

## Handshake
Sent by the client to establish a connection to the server. Must contain a `sender_uuid` if being sent by a client (clients are responsible for generating their own `sender_uuid`). The server will reply with the another message with the `Handshake` instruction. If using ZeroMQ networking, the `parameter` field will be set with a port assignment for the client's ZeroMQ pull server.  

:::tip

Every instruction requires `sender_uuid` if server-bound (being sent by a WorldQL client). To avoid redundancy, we won't list it as a requirement for the instructions below.
:::

## LocalMessage
Sends a message to all clients which are subscribed to a certain area. Must contain a `world_name` and a `position`. The `parameter` and `flex` are sent to all recipients and can be used to store a payload.

## GlobalMessage
Like LocalMessage, but does not require a `position`. Sends the message to all clients which are subscribed to at least one region of the specified World.

## RecordCreate
Creates a new Record. Fields `world_name` must be set and `records` must contain at least one [Record](./records). For [spatial indexing](https://www.worldql.com/posts/2021-09-spatial-partitions-postgres/) to be applied a `position` must be provided. 

## RecordRead
Retrieves a collection of Records or a singular one. There are two patterns for retrieving records:
1. Getting all records near a certain point. Useful for hydrating regions of a world as they are loaded by a client.
2. Retrieving a record by UUID. Due to the way WorldQL partitions Records across multiple tables, looking up a Record with a position requires you to also pass its `position`. This allows the server to know which table to look for the Record in. Records which were created without a `position` can be looked up directly by specifying the UUID in `parameter`.

## RecordUpdate
Modifies the `position`, `data`, or `flex` fields. The record to be updated is specified using a UUID in the `parameter` (and a `position` if the Record has one).

## RecordDelete
Deletes a Record. Uses the same lookup process as RecordUpdate.

## RecordReply
The response to RecordRead. A client-bound Message containing an array of Records.

## AreaSubscribe
Subscribes to receive LocalMessages from a certain area. WorldQL splits the world into cubic areas based on the `WQL_REGION_CUBE_SIZE` configuration variable. For example, if `WQL_REGION_CUBE_SIZE=100` then the world is partitioned into 100^3 cubes that clients can subscribe and unsubscribe to. Requires a `position` specifying an area.

## AreaUnsubscribe
Unsubscribes from LocalMessages in a certain area.

