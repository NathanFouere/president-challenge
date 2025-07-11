# President Challenge

Game project which aims to create configurable and dynamic historical simulations of political and economic events during the 20th century.

## Description

**President Challenge** is a simulation game that puts players in the shoes of a political leader during the 20th century. Players navigate through a series of events, making decisions that shape the course of history. The game is designed to be highly configurable, allowing creator of games to create unique scenarios.

## Architecture

The project is designed following **Domain-Driven Design (DDD)** principles.

## Features

- **Event System**: Players navigate through a system of dynamic events, with consequences that affect the state of the game.
- **Class and Party Dynamics**: Social classes and political parties react to the player's decisions
- **Economic Management**: Players balance resources, industries, and budgets to maintain stability.
- **Multiple Endings**: Outcomes are shaped by player choices, reflecting different historical and hypothetical scenarios.

## Technologies

### Frameworks

- **AdonisJS**: For the backend
- **Nuxt**: For the frontend

### Libraries

- **AdminJS**: For the administration interface

### Database

- **PostgreSQL**

### DevOps

- **Docker**
- **Docker Compose**
- **GitHub Actions**
- **Ansible**
- **Traefik**

## Learning Objectives

I am unsure of finalizing this project, but I have set the following learning objectives:
- **Adonis.js**: Learning AdonisJs to get into the NodeJs ecosystem
- **Domain-Driven Design**: Learning how to structure applications with a focus on the domain logic.
- **Docker**: Learning how to create portable and reproducible development environments.
- **Ansible**: Learning how to work with infrastructure as code tool
- **Traefik**: Learning how to set-up a reverse proxy
- **Deployment**: Learning how to set-up production-ready systems and pipelines.

## Roadmap

You can track the progress and upcoming features of this project on the [Trello Board](https://trello.com/b/yeDvZUYI/allende-challenge-v2) (In French)

## Possible improvements to the project

- "Side Effect Free Functions" should be used to improve the code reliability and testability. Non-side-effect functions are mostly used in the game loop, where arguments of the functions are directly modified (mostly GameTurnProcessStreamData)
- The project is not tested
- Front code should be refactored partially
- The existing global pipeline for turn processing could be leveraged further by introducing nested pipelines, or by using an event-based system
- Event generation could be improved

## Sonarcloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=NathanFouere_allende-challenge-v2&metric=alert_status&token=da295f277cd5d131c11ab2d5705fb52c7f38c414)](https://sonarcloud.io/summary/new_code?id=NathanFouere_allende-challenge-v2)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=NathanFouere_allende-challenge-v2&metric=bugs&token=da295f277cd5d131c11ab2d5705fb52c7f38c414)](https://sonarcloud.io/summary/new_code?id=NathanFouere_allende-challenge-v2)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=NathanFouere_allende-challenge-v2&metric=code_smells&token=da295f277cd5d131c11ab2d5705fb52c7f38c414)](https://sonarcloud.io/summary/new_code?id=NathanFouere_allende-challenge-v2)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=NathanFouere_allende-challenge-v2&metric=duplicated_lines_density&token=da295f277cd5d131c11ab2d5705fb52c7f38c414)](https://sonarcloud.io/summary/new_code?id=NathanFouere_allende-challenge-v2)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=NathanFouere_allende-challenge-v2&metric=coverage&token=da295f277cd5d131c11ab2d5705fb52c7f38c414)](https://sonarcloud.io/summary/new_code?id=NathanFouere_allende-challenge-v2)
