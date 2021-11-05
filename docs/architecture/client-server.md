---
sidebar_position: 1
---

# Client-server pattern

WorldQL is generic enough to serve multiple purposes:
- It can **compliment** existing game servers and be used to build horizontal scaling solutions. This is how our Minecraft scalability solution works. In this case, the Minecraft servers themselves are WorldQL clients, not the players.
- It can **replace** traditional game servers and serve data directly to players. This standalone technique is used in our example browser apps in which the browser itself is the client.

Throughout this documentation, we use some potentially confusing terminology. Here's a quick glossary:

- "WorldQL client"

