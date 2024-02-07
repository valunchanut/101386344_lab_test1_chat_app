# 101386344_lab_test1_chat_app
 markdown

# Chat Application

## Description
This chat application allows users to sign up, log in, join chat rooms, and communicate in real-time. Built with Node.js, Express, Socket.io, and MongoDB.

## Installation

1. Clone the repository:
git clone https://github.com/yourusername/101386344_lab_test1_chat_app.git

2. Navigate to the project directory:
cd 101386344_lab_test1_chat_app

3. Install dependencies:
npm install

4. Start MongoDB using Docker:
Ensure Docker is installed on your system.

Pull the MongoDB image:
docker pull mongo

Start a MongoDB container:
docker run --name mongodb -d -p 27017:27017 mongo

5. Run the application:
npm start


## Usage
- Visit `http://localhost:3000` to access the application.
- Sign up for an account or log in if you already have one.
- Join a chat room from the available list.
- Start chatting with others in the room.

## Features
- User authentication (signup and login)
- Real-time group chat
- Room selection
- "User is typing..." notifications
