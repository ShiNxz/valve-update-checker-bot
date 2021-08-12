
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
    <h3 align="center">Valve Update Checker Bot</h3>

  <p align="center">
    A discord.js bot that checks if your servers are up to date
    <br />
    <br />
    <a href="https://github.com/shinxz/valve-update-checker-bot/issues">Report Bug</a>
    ·
    <a href="https://github.com/shinxz/valve-update-checker-bot/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

A discord bot that checks if your defined servers are up to date, if not it will send you a private message with the un-updated servers.
the bot has many cool features you should check out, and more features will be added soon.

### Built With

* discord.js
* Valve API

<!-- GETTING STARTED -->
## Getting Started

* Create a bot at the discord developer portal (https://discord.com/developers/applications) and save the bot token.

### Installation

1. unzip all the files and execute this command to install all the dependencies.
  ```sh
  npm i
  ```
2. Edit the config.json and add your token under `token`.

<!-- USAGE EXAMPLES -->
## Usage

To start the bot with pm2 please use the following command:
```sh
pm2 start index.js --name"valve-update-checker"
```
and if you dont have pm2 installed please use the command:
```sh
node index.js
```

if you want to start the bot with nodemon you can use the command:
```sh
npm run dev
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/shinxz/valve-update-checker-bot/issues) for a list of proposed features (and known issues).


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Discord: ShiNxz#0001


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/shinxz/valve-update-checker-bot?style=for-the-badge
[contributors-url]: https://github.com/shinxz/valve-update-checker-bot/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/shinxz/valve-update-checker-bot.svg?style=for-the-badge
[forks-url]: https://github.com/shinxz/valve-update-checker-bot/network/members
[stars-shield]: https://img.shields.io/github/stars/shinxz/valve-update-checker-bot.svg?style=for-the-badge
[stars-url]: https://github.com/shinxz/valve-update-checker-bot/stargazers
[issues-shield]: https://img.shields.io/github/issues/shinxz/valve-update-checker-bot.svg?style=for-the-badge
[issues-url]: https://github.com/shinxz/valve-update-checker-bot/issues
[license-shield]: https://img.shields.io/github/license/shinxz/valve-update-checker-bot?style=for-the-badge
[license-url]: https://github.com/shinxz/valve-update-checker-bot/blob/master/LICENSE.txt
