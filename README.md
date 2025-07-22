# ZCoder

ZCoder is a comprehensive platform designed to facilitate collaborative learning among users interested in coding and problem-solving and wants to enhance their skills. It allows users to create profiles, engage in collaborative learning, chat with each other, discuss problem-solving techniques, share interesting insights, and participate in community discussions. Additionally, it includes a contest calendar page where users can stay updated on upcoming contests, and a **Problemset** page where users can browse, search, and track problems from Codeforces.

## Table of Contents

- [Features](#features)
  - [Login Page](#login-page)
  - [User Profiles](#user-profiles)
  - [Collaborative Learning](#collaborative-learning)
  - [Chat](#chat)
  - [Problem-Solving Discussions](#problem-solving-discussions)
  - [Community Section](#community-section)
  - [Contest Calendar](#contest-calendar)
  - [Problemset](#problemset)
- [Installation](#installation)
- [Usage](#usage)

## Features

### Login Page
- **Enhanced Security:**  Our website exclusively supports logins through Google Authentication, ensuring a secure and streamlined login experience for our users.
- **New Account on First Login:** Once you login via Google Authentication, your profile is automatically created; you then fill in the necessary details in the User Profile section.

### User Profiles
- **Details:** Users can choose a username and upload details about their institution and other info.
- **Bio:** A section where users can write a short bio about themselves.
- **Other Profiles:** Users can list their usernames on different platforms such as Codeforces, CodeChef, AtCoder, and LeetCode.
- **LinkedIn:** Users can link their LinkedIn profiles.

### Collaborative Learning
- **Study Groups:** Users can join study groups based on specific topics or programming languages.
- **Learning Resources:** A collection of tutorials, articles, and videos (links) shared by the community.

### Chat
- **Private Messaging:** Users can send private messages to each other.
- **Self Chat:** Users can bookmark questions or articles by sending links to their self-chat.
- **Drawer:** Users can view their profile details by clicking on their avatar.

### Problem-Solving Discussions
- **Solution Sharing:** Users can share their solutions and approaches to problems via community threads.

### Community Section
- **Posts:** Users can create posts to share news, articles, or opinions.
- **Discussion:** Users can start discussions on various topics and engage with the community.

### Contest Calendar
- **Calendar View:** List of upcoming contests on various platforms.
- **Contest Details:** Detailed information about each contest, including duration, platform, and registration links.

### Problemset
- **Fetched from Codeforces API:** Browse the full Codeforces problemset in-app.
- **Search & Filter:** Search by problem name, rating, or tag.
- **Track Solved:** Mark problems as solved/un‑solved, store submission code in localStorage.
- **Quick Links:** Direct “View Problem” links to the Codeforces problem page.

## Installation

To install and run ZCoder locally, follow these steps:

1. Clone the repository:
   ```bash
   https://github.com/mayankkudwan/Zcoder-Platform.git
2. Navigate to the project directory and download the necessary dependencies:(copy-paste the following code into the terminal)
   ```bash
   cd Zcoder
   cd server
   npm i
   npm start
   cd ..
   cd socket
   npm i
   npm start
   cd ..
   cd client
   cd my-app
   npm i
   npm start

After this the app should start in your device (if you are facing any issues/bugs please raise them in the issues section).

## Usage

Once the server is running, open your browser and navigate to http://localhost:3000 to start using ZCoder. You can create an account by directly signing up with google, set up your profile, join collaborative learning groups, chat with other users, participate in problem-solving discussions, and check the contest calendar.

