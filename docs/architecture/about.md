---
sidebar_position: 0
---

# About WorldQL Core

WorldQL Core (formerly called WorldQL Server) is a free, open source spatial database and message broker.

Let's break down what "spatial database and message broker" means:
- Spatial database: Like a normal SQL database but with indexes that make retrieving rows in a certain 3D area faster.
[Here's a blog post describing how WorldQL configures a database](https://www.worldql.com/posts/2021-09-spatial-partitions-postgres/).
- Spatial message broker: Think Redis pub/sub but instead of subscribing to a channel you subscribe to an area.

WorldQL communicates using a [Google Flatbuffer](https://google.github.io/flatbuffers/) schema, which allows for an efficient binary wire format and zero-copy reads from clients. Rather than a human-readable SQL-like language, WorldQL queries are sent by packing instructions and parameters into a fixed schema binary format.

It communicates over multiple protocols including ZeroMQ, WebSocket, and (coming soon) UDP.