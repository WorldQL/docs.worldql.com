---
sidebar_position: 1
slug: /
---
# Welcome

:::danger

This is a work in progress. We are currently migrating to Docusaurus.

:::


Welcome to the WorldQL documentation. Let's discover **how WorldQL works in less than 5 minutes**.

## What is WorldQL?

WorldQL is a spatial database and message broker designed to help developers build multiplayer games faster. Our mission
is to make building massively-multiplayer experiences as accessible as web development.

Let's break down what "spatial database and message broker" means:
- Spatial database: Like a normal SQL database but with indexes that make retrieving rows in a certain 3D area faster.
[Here's a blog post describing how WorldQL configures a database](https://www.worldql.com/posts/2021-09-spatial-partitions-postgres/).
- Spatial message broker: Think Redis pub/sub but instead of subscribing to a channel you subscribe to an area.

## Generate a new site

Generate a new Docusaurus site using the **classic template**:

```shell
npm init docusaurus@latest my-website classic
```

## Start your site

Run the development server:

```shell
cd my-website

npx docusaurus start
```

Your site starts at `http://localhost:3000`.

Open `docs/intro.md` and edit some lines: the site **reloads automatically** and display your changes.
