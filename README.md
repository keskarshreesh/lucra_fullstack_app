# Full-stack Mistral ChatBot (powered by HuggingFace)

This is a full-stack chat application that allows a user to chat with Mistral AI (a LLM model hosted on HuggingFace).
Supported features:
1. Supports multiple user accounts
2. Sign Up, Log In and Session management through JWT
3. Continue Last Chat
4. Start New Chat

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installing and Running Locally](#install-and-run)
    - [Installation](#installation)
      - [Server](#server)
      - [Client](#client)
    - [Local Setup](#local-setup)
      - [Database](#database)
      - [Server](#server)
      - [Client](#client)
- [Application Flow](#application-flow)
- [Demo](#demo-video)


# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

1. [MySQL](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/)
2. [Node.js and npm](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
3. [Python >= 3.6](https://www.python.org/downloads/)

Please install the above prerequisites before proceeding with the following steps.

## Installing and Running Locally
### Installation:
#### Server
(Run from `server` directory)<br>
`pip install -r requirements.txt`
#### Client
(Run from `client` directory)<br>
`npm install`

### Local Setup:
#### Database
Verify that MySQL is up and running in your system, the process varies for different OS, please refer to MySQL documentation <br>
After verifying MySQL status, run the following from database directory, replace `yourusername` with your database username:<br>
`mysql -u yourusername -p < create_fs_app_db.sql`
#### Server
Replace the following values in the .env file in the `server` directory:
1. `HF_API_TOKEN`:
  Obtain an API token from the HuggingFace website and add it here, please follow the instructions on [HuggingFace](https://huggingface.co/docs/hub/en/security-tokens)
2. `DB_USERNAME`:
  Change to your MySQL username, default is generally `root`
3. `DB_PASSWORD`:
  Change to your MySQL password, this is set during installation<br>
4. Other fields like `HF_API_MAX_TOKENS` and `HF_CHAT_MODEL` can be changed for fine-grained control of the application behaviour or to use a different model, `DB_HOST` and `DB_PORT` are generally the same for a locally running MySQL instance, change if customized during installation<br>

After making the above changes, run the start script from the `server` directory:<br>
`python start.py` (Server runs on port `5000`) <br>
#### Client
Start the Client app from the `client` directory<br>
`npm start` (Client runs on the port `3000`)<br>





