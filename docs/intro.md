---
sidebar_position: 1
slug: /
---
# Welcome

:::note

Our documentation is a work in progress. If you have feedback, please let us know on Discord.

:::


Welcome to the WorldQL documentation. Let's discover **how WorldQL works in less than 10 minutes**.

## What is WorldQL?

WorldQL is a spatial database and message broker designed to help developers build multiplayer games faster. Our mission
is to make building massively-multiplayer experiences as accessible as web development.

Let's break down what "spatial database and message broker" means:
- Spatial database: Like a normal SQL database but with indexes that make retrieving rows in a certain 3D area faster.
[Here's a blog post describing how WorldQL configures a database](https://www.worldql.com/posts/2021-09-spatial-partitions-postgres/).
- Spatial message broker: Think Redis pub/sub but instead of subscribing to a channel you subscribe to an area.

WorldQL communicates using a [Google Flatbuffer](https://google.github.io/flatbuffers/) schema, which allows for an efficient binary wire format and zero-copy reads from clients. Rather than a human-readable SQL-like language, WorldQL queries are sent 

It communicates over multiple protocols including ZeroMQ, WebSocket, and (coming soon) UDP.