# Allende Challenge

Game project developed on my free time to learn more about NodeJs, DDD, Docker, Deployment.

## Description

This project is a historical simulation game set in Chile during the government of Salvador Allende in the early 1970s. The aim of the game is to inform and educate players about the challenges and events of this period while providing an engaging, gamified experience.

Players assume the role of the Chilean government and make critical decisions that impact the economy, social classes, and political stability. Each decision leads to specific events and outcomes, ultimately shaping one of several possible endings for the game. The project blends history, politics, and strategy to create an immersive and thought-provoking experience.

## Architecture

The project is designed following **Domain-Driven Design (DDD)** principles, emphasizing modularity and clear domain logic. The architecture allows scalability and flexibility, making it easier to implement complex gameplay mechanics and interactions.

## Features

- **Event System**: Players navigate through a system of dynamic events, with consequences that affect the state of the game.
- **Class and Party Dynamics**: Social classes and political parties react to the player's decisions based on their ideologies.
- **Economic Management**: Players balance resources, industries, and budgets to maintain stability.
- **Multiple Endings**: Outcomes are shaped by player choices, reflecting different historical and hypothetical scenarios.

## Technologies

### Backend
- **AdonisJS**: A powerful Node.js framework used to handle authentication, routing, and API development.

### Frontend
- **Nuxt**: A robust Vue.js-based framework for building a dynamic, interactive user interface.

### Database
- **PostgreSQL**: A reliable, high-performance relational database for storing game state, events, and player data.

### DevOps
- **Docker**: Ensures consistent deployment environments and simplifies local development.
- **Docker Compose**: Manages multi-container applications seamlessly.
- **GitHub Actions**: Automates the CI/CD pipeline for building and deploying the application.

## Learning Objectives

This project serves as a personal learning journey, allowing me to deepen my understanding of:
- **Node.js**: Mastering backend development with modern frameworks.
- **Domain-Driven Design**: Structuring applications with a focus on the domain logic.
- **Docker**: Creating portable and reproducible development environments.
- **Deployment**: Setting up production-ready systems and pipelines.

## How to Run the Project
TODO

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=NathanFouere_allende-challenge-v2&metric=alert_status&token=da295f277cd5d131c11ab2d5705fb52c7f38c414)](https://sonarcloud.io/summary/new_code?id=NathanFouere_allende-challenge-v2)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=NathanFouere_allende-challenge-v2&metric=bugs&token=da295f277cd5d131c11ab2d5705fb52c7f38c414)](https://sonarcloud.io/summary/new_code?id=NathanFouere_allende-challenge-v2)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=NathanFouere_allende-challenge-v2&metric=code_smells&token=da295f277cd5d131c11ab2d5705fb52c7f38c414)](https://sonarcloud.io/summary/new_code?id=NathanFouere_allende-challenge-v2)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=NathanFouere_allende-challenge-v2&metric=duplicated_lines_density&token=da295f277cd5d131c11ab2d5705fb52c7f38c414)](https://sonarcloud.io/summary/new_code?id=NathanFouere_allende-challenge-v2)