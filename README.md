# AI Chatbot

An interactive chatbot that allows users to ask questions and save responses for future reference. This project provides a user-friendly interface for engaging with an AI-powered chatbot, with features for account management and response storage.

## Features

- Ask questions and receive AI-generated responses
- Save and retrieve responses for future reference
- User authentication (register/login)
- Admin panel for super admins to view all users' saved responses

## Environment Variables

To run this project, you need to add the following environment variables to your `.env` file:

```
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-chatbot.git
   cd ai-chatbot
   ```

2. Create a `.env.local` file in the project root and add the required environment variables.

3. Install dependencies and run the development server:
   ```
   npm install
   npm run dev
   ```

## Usage

The AI Chatbot application has the following main routes:

1. `/register` - New users can create an account here.
2. `/login` - Existing users can log in to their account.
3. `/home` - The main interface where users can interact with the chatbot, ask questions, and save responses.
4. `/admin` - Accessible only to users with super admin privileges. Here, admins can view all users' saved responses.

To use the application:

1. Start by registering a new account at `/register` if you're a new user, or log in at `/login` if you already have an account.
2. Once logged in, you'll be directed to the `/home` page where you can interact with the chatbot.
3. Ask questions and save interesting or important responses for future reference.
4. If you have super admin privileges, you can access the `/admin` route to view all users' saved responses.

## Admin Access

To access the admin panel:

- Email: aa@b.com
- Password: 12345678

Please note that these credentials are for demonstration purposes only. In a production environment, you should use strong, unique credentials and keep them secure.

## Super Admin Users

In the user schema, a user is designated as a super admin if they have the `isSuperAdmin` field set to `true`. Only users with this flag can access the `/admin` route and its associated features.

Example user document for a super admin:

```json
{
  "email": "aa@b.com",
  "password": "hashed_password",
  "isSuperAdmin": true
}
```


## Demo

For a comprehensive demonstration of the AI Chatbot, please visit [our demo site](https://chatbot-test-pearl.vercel.app) and create an account to experience the full functionality.
