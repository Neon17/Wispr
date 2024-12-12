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

## Installation

Download NodeJs if you haven't from the website [https://nodejs.org/]
Open command prompt targeting /backend and /frontend folder, run below command separately for each
```cmd
  npm install
```

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
---

#### Get All Users

- **Path:** `/`
- **Method:** GET

---

#### Show All Groups

- **Path:** `/showAllGroupList`
- **Method:** GET
- **Purpose:** To display all groups user has been joined on
- **Result:** (Result are shown after expanding foreign key "members" in "groups" below, see Group Model)
  ```json
  "status": "success",
    "data": {
      "groups": [{}],
      "latestMessages":[{}]
    }
  ```

#### Fetch All Unknown Users

- **Path:** `/fetchAllUnknownUsers`
- **Method:** `GET`
- **Purpose:** To get all new users whom logged in user hasn't joined chat or formed group with

---

#### Add/Create Group

- **Path:** `/addGroup`
- **Method:** POST
- **Purpose:** To add one user to form group in order to chat with him/her
- **Body:**
  ```json
  {
    "id": "674d960eca7e9f02b6df1e60"
  }
    ```
  Or
  ```js
  {
    "name": "The Avengers",
    "id": ["675a8916d009e139336104b8","675a8928d009e139336104ba"]
  }
  ```
  *Note: Logged in user (self) is auto added in the group*
  

#### Add Members in Group

- **Path:** `/addGroup`
- **Method:** POST
- **Purpose:** To add user(s) in an existing group
- **Body:**
  ```json
  {
    "id": "675a8f37d009e139336104d4",
    "members": ["675a8928d009e139336104ba","675a698f478a6cc35beb73e2"]
  }
    ```
*Note: "id" means group ID*

---

  
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
#### Profile Information

- **Path:** `/profile`
- **Method:** GET
- **Purpose:** To get all profile info like username, firstName,...



## Database/Models

### User Model

- **Fields:**
  - `id` (unique identifier)
  - `firstName`
  - `middleName`
  - `lastName`
  - `email`
  - `password`

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
  - `senderId` (ID from User Model)

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
   - Then hit **Fetch All Unknown Users** API to fetch all new users
   - To start a new chat for new user(s):
     - Click "Start Chat" button on frontend to hit **Add/Create Group** API that auto adds logged in user Id and that User Id to form group
     - A new **Group** model is created when initiating a chat.

3. **Messaging:**
   - Fetch all messages in a group using **Get All Messages** API.
   - Send messages by hitting **Send Message** API with the `groupId` and `message`.


## Upcoming Features

1. Add Members in Group
2. Change Group Name
3. Message Status: Sending, Sent, Delivered, Seen
4. Message Status in Group: Seen by Shyam, Ram, John, Sent, Sending, Delivered(if anyone in group online)
5. Profile Picture: Updating profile picture
6. Esewa or Some Payment Integration: User can fill credentials and pay another user if they want

## Hoping to Become the First Nepali Messenger with Payment Integration
