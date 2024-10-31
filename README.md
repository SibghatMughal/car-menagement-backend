# Project Name

#### CarSense

## Description

The Project Is Created Using Expressjs.

Project includes Login, Signup, Category and Car modules.

On Signup User enter needs to input his/her email address and user will receive an auto-generated password on his/her email. User can login using this password.

After login into system user can manager the Cars and Categories, Where user Can Add/ Edit/ Delete Categories and also Add/ Edit/ Delete Cars corresponing to categories.

## Getting Started

### Prerequisites

- Node.js and npm (or yarn) installed on your system. You can download them from the official website.

- This project uses mongodb Database. make sure you install it.

- You need some Gmail Account Credentials for Sending Emails.

### Installation



1. Navigate to the project directory

   ```
2   cd your-project-name
   ```

3. Install project dependencies
   ```
   npm install or yarn install if you prefer yarn
   ```

### Configuration

1. Create a file named .env in the root of your project directory. This file will store environment variables that your application needs to run.

2. Add the following environment variables to your .env file, Add the values for following `DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_NAME,  DATABASE_DIALECT, DATABASE_PORT, SERVER_PORT, USER_EMAIL, USER_PASSWORD, MAIL_SERVICE, USER_NAME, FRONTEND_SERVER, JWT_TOKEN_KEY`

```
  MongoURI
  PORT=SERVER_PORT
  MAIL_USER=USER_EMAIL
  MAIL_PASSWORD=USER_PASSWORD
  MAIL_SERVICE=MAIL_SERVICE
  MAIL_NAME=USER_NAME
  FRONT_END=FRONTEND_SERVER
  ADMIN_JWT_TOKEN_KEY=JWT_TOKEN_KEY
```

### Usage

1. Start the development server to run the project locally
   ```
   npm run start:dev or yarn start:dev
   ```

- This will typically start a development server at `http://localhost:3000/` (or a different port depending on your configuration).
