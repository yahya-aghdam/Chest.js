# Chest.js

![License](https://img.shields.io/badge/License-MIT-blue)

Chestjs is a platform made with nestjs and mongodb for online chat.
You can use it with REST API and WebSocket.

- [Chest.js](#chestjs)
  - [Possibilities](#possibilities)
  - [REST API](#rest-api)
    - [User](#user)
      - [Create a User](#create-a-user)
      - [Update a User](#update-a-user)
      - [Get a User](#get-a-user)
      - [Delete a User](#delete-a-user)
    - [Channel](#channel)
      - [Create a Channel](#create-a-channel)
      - [Update a Channel](#update-a-channel)
      - [Get a Channel](#get-a-channel)
      - [Delete a Channel](#delete-a-channel)
    - [Group](#group)
      - [Create a group](#create-a-group)
      - [Update a group](#update-a-group)
      - [Get a group](#get-a-group)
      - [Delete a group](#delete-a-group)
    - [Private chat](#private-chat)
      - [Create a private chat](#create-a-private-chat)
      - [Get a private chat](#get-a-private-chat)
      - [Delete a private chat](#delete-a-private-chat)
    - [Chat](#chat)
      - [Create a chat](#create-a-chat)
      - [Update a chat](#update-a-chat)
      - [Get a chat](#get-a-chat)
      - [Delete a chat](#delete-a-chat)
  - [WebSocket](#websocket)
    - [Sending message](#sending-message)
    - [Reciving message](#reciving-message)

## Possibilities

Possibilities of this repo with REST API:

1. Create/Update/Get/Delete User
2. Create/Update/Get/Delete Channel
3. Create/Update/Get/Delete Group
4. Create/Update/Get/Delete Private chat
5. Create/Update/Get/Delete Chats

</br>

Possibilities of this repo with WebSocket:

1. Send and recive message in realtime

</br>

You can see examples of usage with postman example in here:
<https://postman.com/scorpio-team/workspace/chest-js>

First clone repo:
`git clone https://github.com/scorpio-demon/Chest.js.git`

Go to the installed folder:
`cd Chest.js`

Install all deps:
`npm i`

Run app:
`npm run start`

</br>

## REST API

Main URL: `http://localhost:3000/api`

You can use in this method to handle data between client and database.
You must send data with `JSON` method to the api.

### User

#### Create a User

**Path: `/user`**
**Method: `POST`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 3 characters   | 30 characters  | No       |
| username  | String | 3 characters   | 30 characters  | Yes      |
| name      | String | 3 characters   | 30 characters  | Yes      |

</br>

#### Update a User

**Path: `/user`**
**Method: `PUT`**

| Field         | Type   | Minimum Length | Maximum Length | Required |
| ------------- | ------ | -------------- | -------------- | -------- |
| custom_id     | String | 12 characters  | 30 characters  | Yes      |
| username      | String | 3 characters   | 30 characters  | No       |
| name          | String | 3 characters   | 30 characters  | No       |
| chats_id_list | Array  | -              | -              | No       |

</br>

#### Get a User

**Path: `/user/[custom_id]`**
**Method: `GET`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>

#### Delete a User

**Path: `/user/[custom_id]`**
**Method: `DELETE`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>
<hr>

### Channel

#### Create a Channel

**Path: `/channel`**
**Method: `POST`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | No       |
| name      | String | 3 characters   | 30 characters  | Yes      |
| admins    | Array  | 1 item         | 100 items      | Yes      |
| members   | Array  | 1 item         | 10,000 items   | Yes      |

</br>

#### Update a Channel

**Path: `/channel`**
**Method: `PUT`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |
| name      | String | 3 characters   | 30 characters  | No       |
| admins    | Array  | 1 item         | 100 items      | No       |
| members   | Array  | 1 item         | 1,000 items    | No       |

</br>

#### Get a Channel

**Path: `/channel/[custom_id]`**
**Method: `GET`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>

#### Delete a Channel

**Path: `/channel/[custom_id]`**
**Method: `DELETE`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>
<hr>

### Group

#### Create a group

**Path: `/group`**
**Method: `POST`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | No       |
| name      | String | 3 characters   | 30 characters  | Yes      |
| admins    | Array  | 1 item         | 100 items      | Yes      |
| members   | Array  | 1 item         | 10,000 items   | Yes      |

</br>
<hr>

#### Update a group

**Path: `/group`**
**Method: `PUT`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |
| name      | String | 3 characters   | 30 characters  | No       |
| admins    | Array  | 1 item         | 100 items      | No       |
| members   | Array  | 1 item         | 10,000 items   | No       |

</br>

#### Get a group

**Path: `/group/[custom_id]`**
**Method: `GET`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>

#### Delete a group

**Path: `/group/[custom_id]`**
**Method: `DELETE`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>
<hr>

### Private chat

#### Create a private chat

**Path: `/private_chat`**
**Method: `POST`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | No       |
| persons   | Array  | 2 items        | 2 items        | Yes      |

</br>

#### Get a private chat

**Path: `/private_chat/[custom_id]`**
**Method: `GET`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>

#### Delete a private chat

**Path: `/private_chat/[custom_id]`**
**Method: `DELETE`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>
<hr>

### Chat

#### Create a chat

**Path: `/chat`**
**Method: `POST`**

| Field                      | Type    | Minimum Length | Maximum Length | Required |
| -------------------------- | ------- | -------------- | -------------- | -------- |
| sender_custom_id           | String  | 3 characters   | 30 characters  | Yes      |
| reciver_custom_id          | String  | 3 characters   | 30 characters  | Yes      |
| chat_room_id               | String  | 3 characters   | 30 characters  | Yes      |
| mentioned_person_custom_id | String  | 11 characters  | 30 characters  | No       |
| message                    | String  | 1 character    | 300 characters | Yes      |

</br>

#### Update a chat

**Path: `/chat`**
**Method: `PUT`**

| Field                      | Type    | Minimum Length | Maximum Length | Required |
| -------------------------- | ------- | -------------- | -------------- | -------- |
| custom_id                  | String  | 12 characters  | 30 characters  | Yes      |
| message                    | String  | 1 character    | 300 characters | No       |
| is_read                    | Boolean | -              | -              | No       |
| is_notified                | Boolean | -              | -              | No       |
| is_mentioned               | Boolean | -              | -              | No       |
| mentioned_person_custom_id | String  | 11 characters  | 30 characters  | No       |
| time_stamp                 | String  | 8 characters   | 14 characters  | No       |

</br>

#### Get a chat

**Path: `/chat/[custom_id]`**
**Method: `GET`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>

#### Delete a chat

**Path: `/chat/[custom_id]`**
**Method: `DELETE`**

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>

## WebSocket

Socket URL: `http://localhost:3000`

Sending and reciving message is aviliable with socket. You have to send data in `JSON` like REST API in here too. Just connect to the server and use listeners in way you want :)

### Sending message

**Listener: `sendMessage`**

| Field                      | Type    | Minimum Length | Maximum Length | Required |
| -------------------------- | ------- | -------------- | -------------- | -------- |
| sender_custom_id           | String  | 3 characters   | 30 characters  | Yes      |
| reciver_custom_id          | String  | 3 characters   | 30 characters  | Yes      |
| chat_room_id               | String  | 3 characters   | 30 characters  | Yes      |
| mentioned_person_custom_id | String  | 11 characters  | 30 characters  | No       |
| message                    | String  | 1 character    | 300 characters | Yes      |

</br>

### Reciving message

**Listener: `reciveAllMessages`**

Eplanation: Get all messages in first connection

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>

**Listener: `stopGettingMessageNotification`**

Eplanation: Stop getting new message notification

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |

</br>

**Listener: `getMessageNotification`**

Eplanation: Start to get new message notification

| Field     | Type   | Minimum Length | Maximum Length | Required |
| --------- | ------ | -------------- | -------------- | -------- |
| custom_id | String | 12 characters  | 30 characters  | Yes      |
