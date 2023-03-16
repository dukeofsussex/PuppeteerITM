<p align="center">
  <h3 align="center">Puppeteer In The Middle</h3>
  <p align="center">
    Small server that allows users to request pages which are proxied through Puppeteer
    <br />
    <br />
    <a href="https://github.com/dukeofsussex/PuppeteerITM/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/dukeofsussex/PuppeteerITM"
        alt="License"/>
    </a>
    <a href="/">
      <img src="https://img.shields.io/github/package-json/v/dukeofsussex/PuppeteerITM"
        alt="Version"/>
    </a>
  </p>
</p>

## About The Project

Initially created to proxy requests for [Mealie][Mealie] as some sites implement Cloudflare and block [Mealie][Mealie] from scraping the page to import the recipes. Requests and returns page content for the URL it receives as query parameter.

## Getting Started

## Docker

1. Build the image
```dockerfile
docker build -t puppeteeritm https://github.com/dukeofsussex/PuppeteerITM.git#main
```
2. Launch your container
```dockerfile
docker run --init -p 8080:8080 -e SECRET=<secret> --security-opt seccomp=chrome.json --name <container name> -d puppeteeritm
```
3. Try it out in your preferred browser
```http
http://localhost:8080?secret=<secret>&url=<website url>
```

## Local

### Prerequisites

* [NodeJS](https://nodejs.org/en/)

### Installation

1. Clone the repo
```sh
git clone https://github.com/dukeofsussex/PuppeteerITM.git
```
2. Install NPM packages
```sh
npm install
```
1. Run the `index.js` file along with providing the `SECRET` environment variable
2. Try it out in your preferred browser
```http
http://localhost:8080?secret=<secret>&url=<website url>
```

## Config

PuppeteerITM can be configured with a few environment variables:

| Variable  | Default | Required | Description |
|-----------|---------|:--------:|--- |
| SECRET    | \<none>  | X        | Basic level of security to only allow requests from trusted sources |
| PPT_AGENT | Mozilla/5.0 (Windows NT 5.1; rv:7.0.1) Gecko/20100101 Firefox/7.0.1 | | Custom Puppeteer agent header |
| PPT_EVENT | domcontentloaded | | [Puppeteer lifecycle event][PPT Lifecycle] |

## Contributing

Any contributions made are welcome and **greatly appreciated**.

1. Fork the Project
2. Create your feature branch (`git checkout -b feature`)
3. Commit your changes (`git commit -m 'Add something awesome'`)
4. Push to the branch (`git push origin feature`)
5. Open a Pull Request

## License

This project is licensed under the GNU GPL License. See the [LICENSE](LICENSE) file for details.

<!-- LINKS -->
[Mealie]: https://github.com/hay-kot/mealie
[PPT Lifecycle]: https://pptr.dev/api/puppeteer.puppeteerlifecycleevent/
