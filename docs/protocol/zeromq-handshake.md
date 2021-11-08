---
sidebar_position: 1
---

# ZeroMQ Handshake

ZeroMQ is one of WorldQL's available transport protocols and is recommended only if you are using WorldQL to add horizontal scalability features to an existing game server. When using ZeroMQ, both the WorldQL server and clients run a ZeroMQ PULL socket and communicate by PUSHing. Your game server and WorldQL server should exist in the same host machine or datacenter.

For a WorldQL client using ZeroMQ to establish a connection with a WorldQL server, the following process is used:
1. Create a PULL socket by binding to a random port using the built-in bind_to_random_port method.
2. Send a Handshake Instruction to the server containing the hostname and port in the `parameter` field.
3. Receive a Handshake Instruction back from the server.
4. The client should send a [Heartbeat](../architecture/instructions#heartbeat) instruction at least once every 60 seconds to avoid being dropped from WorldQL's peer list.