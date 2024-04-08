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
- [Future Work](#future-work)


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

# Application Flow
Please refer to the demo video below for a demonstration of all steps listed below:
1. **Sign Up**:<br>
  When the user lands on the application for the first time, a Sign In page opens up by default. First time users are directed to Sign Up for a new user account by clicking on the link at the bottom of the Sign In box.
2. **Sign In**:<br>
  After successful Sign Up, user is directed to Proceed with Log In, where they can sign in with the credentials provided during Sign Up
  Signing in successfully will generate a `JWT` access token which is persisted in the user's browser, which allows the user session to remain active for an hour without having to sign in again. 
3. **Start New Chat**:<br>
  This will open up an empty chat window where the user can start a new chat with Mistral AI
4. **Get Last Chat**:<br>
  If the user logs out or leaves the application, they can continue their last chat from where they left off. For a first time user, user will be prompted to create a new chat.
5. **Logout**: <br>
  The user can log out of the application, which will erase their current session and they will need to sign in again to access the application

# Future Work
1. **Improve application security**: <br>
  Login and session management to be implemented through cookies, currently implemented through `JWT` which can be vulnerable to `CSRF` attacks
2. **Allow AI model selection**: <br>
  Allow the user to select between different AI models to chat with
3. **Chat History**: <br>
  Allow user to view their previous chats. They're already stored in the database, corresponding UX and APIs will be built.




