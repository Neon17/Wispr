# 🌟 Wispr - Modern Messaging Platform

<p align="center">
  <img src="https://github.com/Neon17/First-Chat-App/blob/main/frontend/src/components/LandingPage/WisprLogo.svg" alt="Wispr Logo">
</p>
Wispr is a modern, secure, and intuitive chat application  that transforms the way people communicate online.

## ✨ Features

- **Real-time Messaging**: Experience instant message delivery with cutting-edge infrastructure
- **End-to-End Encryption**: Military-grade encryption for secure communications
- **Smart Organization**: AI-powered chat organization keeps conversations clean and relevant
- **Modern UI**: Clean, responsive design with smooth animations
- **Cross-Platform**: Available on web, with mobile apps coming soon

## 🚀 Quick Start

## Frontend

- Built using **React JS**.

## Backend

- Developed using **Node.js**.

---

## API Endpoints

### Backend APIs

- **Base URL:** `http://localhost:5000`

#### Test API

- **Path:** `/`
- **Method:** GET

---

### User APIs

- **Base URL:** `http://localhost:5000/api/v1/users`
- **Authentication:** 
  - Required for all APIs except Login and Signup.
  - Uses **JSON Web Token (JWT)**.
  - JWT is created and sent in the response after a successful login or signup.
- **Response Format:**
  - **Success:** 
    ```json
    {
      "status": "success",
      "data": [] // array of objects
    }
    ```
  - **Error:** 
    ```json
    {
      "status": "error",
      "message": "error message"
    }
    ```

---

#### Login

- **Path:** `/login`
- **Method:** POST
- **Body:**
  ```json
  {
    "email": "abc@gmail.com",
    "password": "12345"
  }
    ```
#### Signup

- **Path:** `/signup`
- **Method:** POST
- **Body:**
  ```json
  {
    "firstName": "Ram",
    "middleName": "Bahadur",
    "lastName": "Thapa",
    "email": "ram@gmail.com",
    "password": "12345",
    "confirmPassword": "12345"
  }
  #### Get All Users

- **Path:** `/`
- **Method:** GET

---

#### Show All Group List

- **Path:** `/showAllGroupList`
- **Method:** GET

---

#### Add/Create Group

- **Path:** `/addGroup`
- **Method:** POST
- **Body:**
  ```json
  {
    "id": "674d960eca7e9f02b6df1e60"
  }
    ```
#### Get All Messages

- **Path:** `/getAllMessages`
- **Method:** POST
- **Body:**
  ```json
  {
    "groupId": "674db9ff66786ba2f2df8bf2"
  }
    ```
#### Send Message

- **Path:** `/sendMessage`
- **Method:** POST
- **Body:**
  ```json
  {
    "groupId": "674db9ff66786ba2f2df8bf2",
    "message": "Second message is not that interesting"
  }
    ```
    ## Database/Models

### User Model

- **Fields:**
  - `id` (unique identifier)
  - `firstName`
  - `middleName`
  - `lastName`
  - `email`
  - `password`
  - `confirmPassword`

---

### Group Model

- **Fields:**
  - `id` (unique identifier)
  - `name`
  - `members` (array of user IDs)
  - `createdAt`

---

### Message Model

- **Fields:**
  - `id` (unique identifier)
  - `groupId` (ID from Group Model)
  - `message`
  - `dateTime`

---

## How It Works

1. **User Authentication:**
   - On **Login** or **Signup**, a response is sent with:
     - `status`
     - `token`
     - `data`
   - The `token` is used for authentication by adding it to request headers as:
     ```
     Authorization: "Bearer <token>"
     ```

2. **Group Management:**
   - After login, hit **Show All Group List** API to fetch all user chat group lists.
   - To start a new chat:
     - Use **Get All Users** API to search for users (excluding the current user).
     - A new **Group** model is created when initiating a chat.

3. **Messaging:**
   - Fetch all messages in a group using **Get All Messages** API.
   - Send messages by hitting **Send Message** API with the `groupId` and `message`.
