---
sidebar_position: 1
---

# Client-server pattern

WorldQL is generic enough to serve multiple purposes:
- It can **compliment** existing game servers and be used to build horizontal scaling solutions. This is how our Minecraft scalability solution works. In this case, the Minecraft servers themselves are WorldQL clients, not the players.
- It can **replace** traditional game servers and serve data directly to players. This standalone technique is used in our example browser apps in which the browser itself is the client.

Throughout this documentation, we use some potentially confusing terminology. Here's a quick glossary:

- _WorldQL client_ refers to a consumer of the WorldQL server's API. **This WorldQL client could be a game server in itself** (eg. a Minecraft server running the Mammoth plugin, which [is actually called "WorldQLClient"](https://github.com/WorldQL/mammoth/blob/master/pom.xml#L8).
- _Player_ refers to the client of an end user. This is to avoid confusion between a WorldQL client that's another game server and one that's an actual end-user. "Player"s are always a WorldQL client, but not all WorldQL clients are players.

WorldQL follows a simple authoritative server model. While the client is free to make predictions to hide latency, the server ultimately holds authority over the game state. This means that WorldQL cannot be used to build peer-to-peer games.