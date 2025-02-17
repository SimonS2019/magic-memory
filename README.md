# Magic Memory

## Live Project
You can view the live project [here](https://magic-memory-new.web.app/).

## Description
Magic Memory is a web application built using React and Firebase. It is part of the "Build Web Apps with React & Firebase" course. This project demonstrates how to create a memory game and deploy it using Firebase.

This project combines React and Firebase, which provides a low-cost hosting solution for real projects. I followed the tutorial up to commit [7fc1207] on January 19, 2024. After that, I added more features to the project, such as allowing users to use their own images.

Additionally, I created a special version of the game with images of my wife and myself, along with animations and content to celebrate her birthday. However, I have removed the birthday-specific content in this demo project.

It has been very fun to learn new technologies by creating a game. I also made another game called "Catch-the-Falling-Object," [here](https://github.com/SimonS2019/Catch-the-Falling-Object), which is a mobile game and a gift for my wife.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Features](#features)
- [Contributing](#contributing)
- [Contact](#contact)

## Prerequisites
- Node.js (version 18.x or higher)
  - I used 18.20.3

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/SimonS2019/magic-memory.git
    ```
2. Navigate to the project directory:
    ```bash
    cd magic-memory
    ```
3. Install dependencies:
    ```bash
    npm install
    ```

## Usage
To start the development server:
    ```bash
    npm start
    ```

## Deployment

To ensure your web app is updated in real-time, you can deploy it to Firebase. Follow these steps:

1. Build the project:
    ```bash
    npm run build
    ```
    This will create an optimized production build in the `build` folder.

2. Login to Firebase:
    ```bash
    firebase login
    ```
    Make sure you have a Firebase account and the Firebase CLI installed.

3. Initialize Firebase in your project:
    ```bash
    firebase init
    ```
    Select `Hosting` and follow the prompts to set up your Firebase project.

4. Deploy to Firebase:
    ```bash
    firebase deploy
    ```

Your web app should now be live on Firebase Hosting!

## Features
- User-friendly interface
- Allows users to upload their own images
- Real-time updates with Firebase Hosting
- Optimized for performance

## Contact
Simon Shen - [shentiexiong@gmail.com](mailto:shentiexiong@gmail.com)