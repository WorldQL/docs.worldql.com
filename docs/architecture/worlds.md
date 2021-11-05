---
sidebar_position: 3
---

# Worlds

Worlds refer to separate 3D spaces in WorldQL. Think of them like an SQL database; Worlds allow you to isolate Records and can be used to direct Messages between multiple distinct worlds.

There are a variety of use cases for Worlds:
- Creating "sessions" or "instances" in a match-based multiplayer game.
- Supporting games like Minecraft that literally have multiple worlds. We use a separate WorldQL World for the overworld, Nether, and The End in Mammoth. This allows permanent Records that represent blocks to not interfere with each-other. For example, a block placed at (1, 65, 1) in the overworld will not be visible in the Nether.
- Creating user-owned shared spaces. If you're building a creative game, Worlds are an easy way to give players a personal, isolated area.