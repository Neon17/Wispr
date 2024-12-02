# First Chat App

### Frontend

Frontend done in React JS

### Backend

Backend done in Node JS

### API EndPoints

#### Backend APIs

URL: 'http://localhost:5000'

##### Test URL : /

#### User APIs

URL: 'http://localhost:5000/api/v1/users
All User APIs except Login and Signup requires authentication
Authentication is done by JSON Web Token
JSON Web Token is created and sent via response after successful login and signup

Response format for every successful API hit: 
{
  "status": "success",
  "data": //some data array of objects
}
Response format for every unsuccessful API hit: 
{
  "status": "error",
  "message": //some message string
}

Data objects are models(tables in ORM). You can see model section for available models

##### Login
Path: '/login'
Method: POST
Body: {
    "email": "abc@gmail.com",
    "password": "12345"
}

##### Signup
Path: '/signup'
Method: POST
Body: {
    "firstName": "Ram",
    "middleName": "Bahadur",
    "lastName": "Thapa",
    "email": "ram@gmail.com",
    "password": "12345",
    "confirmPassword": "12345"
}

##### Get All Users
Path: '/'
Method: GET

##### Show All Group List
Path: '/showAllGroupList'
Method: GET

##### Add/Create Group
Path: '/addGroup'
Method: POST
Body: {
    "id": "674d960eca7e9f02b6df1e60"
}

##### Get all Messages
Path: '/getAllMessages'
Method: POST
Body: {
    "groupId": "674db9ff66786ba2f2df8bf2"
}

##### Send Message
Path: '/sendMessage'
Method: POST
Body: {
    "groupId": "674db9ff66786ba2f2df8bf2",
    "message": "Second message is not that interesting"
}


### Database/Models 

#### User
Fields: id, firstName, middleName, lastName, email, password, confirmPassword

#### Group
Fields: id, name, members(array of user IDs), createdAt

#### Message
Fields: id, groupId(id froom Group Model), message, dateTime


### How it works

When user logins or signups, response is sent in json with status, token, data
Same token is applied in request headers as authorization: "Bearer token" for every other User APIs
All user chat group lists are shown as result of "Show All Group List" API hit
Then user can search for another user except himself/herself with "Get All Users" API and start chat 
When starting chat, model Group is created with members whom that user tried to chat
Then, "Get All Messages" API is hit and all messages shown
Message can be send by adding groupId and message to request field hitting "Send Message" API
