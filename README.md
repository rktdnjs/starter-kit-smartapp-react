# ReactApp for the Samsung SmartThings ImageCapability Checking

This project was developed to check the ImageCapability image of SmartThings.

This project based on react framework.

## Setup Instructions

### Prerequisites

- A [Samsung account](https://account.samsung.com/membership/index.do) and the SmartThings mobile application.
- A [Developer Workspace](https://smartthings.developer.samsung.com/workspace/) account.
- SmartThings Devices(ex. Camera)

### If testing locally (using provided webserver)

- [Node.js](https://nodejs.org) and [npm](https://npmjs.com) installed (verified with npm version 6.14.8 and Node 12.19.0).
- [ngrok](https://ngrok.com/) installed to create a secure tunnel and create a globally available URL for fast testing.

### Start

Description for this Project : [Link](https://bronzed-amount-986.notion.site/How-to-use-starter-kit-smartapp-react-0ed53f6cab9143a8b04fb7ada53f2496?pvs=4)

#### Local - Server

- [BackEnd Project Repository](https://github.com/kwanghoon/starter-kit-smartapp-nodejs)

1. Install the dependencies for server : `npm install`.

2. Start the server: `npm start`.

3. Start ngrok (in another terminal window/tab): `ngrok http 3005`. Copy the `https:` URL to your clipboard.

#### Local - Front

- [FrontEnd Project Repository](https://github.com/rktdnjs/starter-kit-smartapp-react)

1. Install the dependencies for this app : `npm install`.

2. Start the project: `npm start`

#### Check Images

1. (After you run above projects)Depending on the content of the SmartApp, information corresponding to the imageURL in the imageCapture results when an event occurs for SmartThings devices is stored in the path `http://localhost:3005/api/image` and data can be retrieved by sending a request to this URL from the frontend projects.

2. Recall capture results URL from server - Click on the URL list you want - Enter token issued by [SmartThings](https://account.smartthings.com/tokens) - Load selected Image

3. You can check and save the desired image from the list of images captured since the server operation.
