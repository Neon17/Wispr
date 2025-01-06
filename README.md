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

- Download NodeJs if you haven't from the website [https://nodejs.org/]
- Open command prompt targeting /backend and /frontend folder, run below command separately for each
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

#### Add/Confirm Friend

- **Path:**  `/addFriend`
- **Method:** POST
- **Purpose:** To add or confirm friend
- **Result:** (Result are shown after expanding foreign key "friends" of logged in "User", see User Model)
  ```json
    "status": "success",
    "data": {
        /*smith@gmail.com is logged in user*/
        "gender": "male",
        "_id": "675a8c71d009e139336104be",
        "username": "User1733986516677",
        "firstName": "John",
        "lastName": "Smith",
        "email": "smith@gmail.com",
        "password": "$2b$12$5uBUol/iJr4zqeyZ5ZLo8elQXeeIyqTj1Joawikz2X6pVt6DBJWgG",
        "__v": 0,
        "friend_requests": [],
        "friends": [
            {
                "gender": "male",
                "_id": "675a8916d009e139336104b8",
                "username": "User1733986516677",
                "firstName": "Shyam",
                "lastName": "Chhettri",
                "email": "shyam@gmail.com",
                "password": "$2b$12$anxHRvXBqHifziPJjNdtlug2.2416xpNmVF0muH1I6.9XKi.rDYiu",
                "__v": 0,
                "add_friend_requests": [],
                "friend_requests": [],
                "friends": [
                    "675a8c71d009e139336104be"
                ]
            }
        ],
        "add_friend_requests": []
    }
  ```

#### Get All Friend Requests

- **Path:** `/getAllFriendRequests`
- **Method:** GET
- **Purpose:** To display all friend requests logged in user have received
- **Result:** (Friend Requests are shown in array expanding foreign key "friend_requests" in "User", see User Model)
  ```json
    "status": "success",
    "data": []
  ```

#### Get All Friends

- **Path:** `/getAllFriends`
- **Method:** GET
- **Purpose:** To display all friends logged in user have
- **Result:** (Friends are shown in array, see User Model)
  ```json
    "status": "success",
    "data": []
  ```

#### Get All Non Friend Users

- **Path:** `/fetchAllUsersExceptFriends`
- **Method:** GET
- **Purpose:** To display all users whom logged in user isn't friend of
- **Result:**
  ```json
    "status": "success",
    "data": []
  ```
  *All users are shown with adding **friendStatus** attribute*.
  *If **friendStatus = 0** then, no one has added friend request*.
  *If **friendStatus = 1** then, logged in user has sent friend request*.
  *If **friendStatus = 2** then, that user has sent friend request to*.

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
- **Purpose:** To get all users whom logged in user hasn't joined and started chat with

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

---
### Message Requests

- The user who wants to send message to unknown user (that means which is not his/her friend) sends message requests. That user is termed as **Sender**. And the user who receives the request is termed as **Receiver**.
- Sender cannot see Seen status,  Delivered Status, but only Sent Status
- Receiver can see the Sender message but has to accept the conversation to start messaging with each other
- Sender can only send message but without receiver's acceptance, it is like one way traffic with no Seen or Delivery Info



#### Get All Message Requests

  - **Path:** `getAllMessageRequest`
  - **Method:** GET
  - **Purpose:** To get all message requests of all unknown users
  - **Result:** Group with populated Users also with **isSender** is returned. If **isSender** is **true**, then that logged in user sent message request and if **isSender** is **false**, someone sent message request to.

#### Create Message Request

  - **Path:** `createMessageRequest`
  - **Method:** POST
  - **Purpose:** To send message to unknown user (who is not friend) 
  - **Body:** 
    ```json
    {
      "id": "675a8928d009e139336104ba"
    }
    ```

#### Accept Message Request

  - **Path:** `acceptMessageRequest`
  - **Method:** POST
  - **Purpose:** To accept message request sent by unknown user (who is not friend)
  - **Body:** 
    ```json
    {
      "groupId": "677bd523321be56d69e69d1c"
    }
    ```
  
  ##### *Message is sent by `/sendMessage` API. But for user who has to accept message request should accept message request first, otherwise his/her message will not be sent*
---

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
  - `confirmPassword`
  - `friends` (ID from User Model)
  - `add_friend_requests` (ID from User Model)
  - `friend_requests` (ID from User Model)
  - `dob`
  - `profilePicture`
  - `bio`
  - `gender`

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
  
4. **Friends:**
   - Add Friend to add new friend.
   - After adding friend, that users' ID is stored in `add_friend_requests` of logged in User model
   - Also, logged in User Id is stored in that user's `friend_requests` column
   - After that user hit /addFriend to logged in User, then seeing `friend_requests`, it confirms friend and
   - Both friends will delete their Ids from `add_friend_requests` and `friend_requests`; and add Id on `friends`


## Upcoming Features

1. Add Members in Group
2. Change Group Name
3. Message Status: Sending, Sent, Delivered, Seen
4. Message Status in Group: Seen by Shyam, Ram, John, Sent, Sending, Delivered(if anyone in group online)
5. Profile Picture: Updating profile picture
6. Esewa or Some Payment Integration: User can fill credentials and pay another user if they want

## Hoping to Become the First Nepali Messenger with Payment Integration
