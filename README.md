# Lite Chat

![Frame](https://user-images.githubusercontent.com/99620863/177199682-a2091c25-cc69-46b7-a056-5a2528b1dec7.svg)      
  
Deployed at https://lite-chat-react.herokuapp.com/  
Server repo: https://github.com/nancy-sun/litechat-server
  
## Description
Lite Chat is an anonymous n-to-n chat application for text and voice chat, where users could create a temporary chatroom or join an existing chatroom. Type on the message input box to sent text messages to the room, enter the voice channel to start talking. Works in web browsers without any additional downloads.  
User's text messages are sent through websocket connection, and voices are sent through peer to peer connection. 

## Installation  
Clone source code locally:
```
$ git clone https://github.com/nancy-sun/litechat
```
Install dependencies:
```
$ npm install
```
Start running:
```
$ npm start
```

## Tools/Methods  

**Tech Stack**
* React
* Sass
* Node.js
* MongoDB - Mongoose
* figma (for prototype)

**Resources/Tools/Methods**
* [Socket.io & Socket.io client](https://socket.io/docs/v4/client-api/)
* [cors](https://www.npmjs.com/package/cors)
* [axios](https://axios-http.com/docs/api_intro)
* [WebRTC](https://webrtc.org/getting-started/overview), [simple-peer](https://www.npmjs.com/package/simple-peer)
* [React Bootstrap](https://react-bootstrap.github.io/)
* [animation.css](https://animate.style/)
* [PokeAPI](https://pokeapi.co/)
  
## Prototype  

**Design/prototype resources**
* [UI](https://www.figma.com/community/file/818668544591341056)
* [logo](https://www.figma.com/community/file/1088206555564423933)
* [iconmonstr](https://iconmonstr.com/)
* [figma streamline plugin](https://streamline.canny.io/)
* [screen size mockup](https://www.figma.com/community/file/1103958429333309485)
  
![prototype](https://user-images.githubusercontent.com/99620863/177220923-e7ba5244-c4c8-4ee5-99c9-a992e0fc1a87.svg)
  
## Future discussion
* Potential improvements: code refactoring, implement self-built STUN server, register for a TURN server, etc.  
* More features(TBD): video chat, screen sharing, send images in text channel, login Auth to save a room, etc.
