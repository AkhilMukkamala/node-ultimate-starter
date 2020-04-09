# node-ultimate-starter!

**node-ultimate-starter** is the repo you should look into if you need one of those awesome boilerplates. Wondering what's so special about this ? Checkout out the [Features](#features) and other info below. This repo follows layered architecture.

## Table of Contents

* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Features](#features)
* [File Structure](#file-structure)
* [Coding Standards](#coding-standards)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contact](#contact)

## Getting Started

###  Prerequisites

1. Rename **.env.example** to **.env**
2. Change the appropriate values of **.env** variables.
3. If you don't have PM2 Globally Installed., run this.
```
npm install pm2 -g
```
### Installation
```
npm install
```
## Usage

To run in development mode, use:
```
pm2 run dev
```
To run in debug mode, use:
```
pm2 run debug
```

To run in production mode, use:
```
npm start
```

## Features

1. Authentication
    - SignUp
    - SignIn
    - Two Step Verification ( Google Authenticator )
    - Email Verification
    - Resend Email
    - Reset Password
    - Powerful password encryption using ARGON2
2. Users Account Related
	- User Settings
		- Change Password
		- Theme Preferences
		- Notification Preferences
	- Save User Session - User Tracking
		- IP Address
		- UserAgent
		- Physical Location ( Coordinates )
4. Log Management
	- Log Rotation on a daily basis
5. Mailer Service
	- Custom Mail
	- Pre-defined Mails
6. Response Formatter ( Common Response Format Service for all the API's )
7. PM2 Deployment
	- Environments
		- Development
		- Production
		- Debug


## File Structure


## Coding Standards

- NodeJS Coding best practises are followed from [NodeBestPractices](https://github.com/goldbergyoni/nodebestpractices) Repo.
- Codebase strictly uses Async/Await, No usage of Callbacks & Promises.
- JavaScript ES6 Standards.
- Promises can be used when using 3rd party code snippet's but, Restrict to Async/Await wherever possible.

## Roadmap

Coming soon.

## Contributing

 Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are  **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AwesomeFeature`)
3.  Commit your Changes (`git commit -m 'Add some AwesomeFeature'`)
4.  Push to the Branch (`git push origin feature/AwesomeFeature`)
5.  Open a Pull Request

## License

Distributed under the MIT License. See  `LICENSE`  for more information.

## Contact

Akhil Mukkamala - [@AkhilMukkamala](https://twitter.com/AkhilMukkamala) - [E-Mail](mailto:akhil.mukkamala@gmail.com)
