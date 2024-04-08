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
    -[Installation](#installation)
      -[Server](#server)
      -[Client](#client)
    -[Local Setup](#local-setup)
      -[Database](#database)
      -[Server](#server)
      -[Client](#client)


# Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

What things you need to install the software and how to install them:

MySQL (A GUI like MySQL Workbench would be useful but not required)
Node.js and npm
Python >= 3.6

Please install the above prerequisites before proceeding with the following steps.

## Installing and Running Locally
### Installation:
#### Server
(Run from server directory)
`pip install -r requirements.txt`
#### Client
(Run from client directory)
`cd client`
`npm install`

### Local Setup:
#### Database 
(Run from database directory, replace `yourusername` with your database username):
`mysql -u yourusername -p < create_fs_app_db.sql`
#### Server
Replace the following values in the .env file in the server directory:
1. HF_API_TOKEN:
  Obtain an API token from the HuggingFace website and add it here, please follow the instructions on [HuggingFace](https://huggingface.co/docs/hub/en/security-tokens)
2. DB_PASSWORD:
  Change to your MySQL password, this is set during installation
`python start.py`
#### Client
`npm start`




