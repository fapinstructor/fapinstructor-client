# ⚙️ Quick Start
Please note that ***this guide is made for Linux***. If you are using another operating system, you will need to adapt the commands accordingly.

### Prerequisites:

- [Git](https://git-scm.com/)
- [Node 14+](https://nodejs.org/en)
- [Yarn 1.22+](https://yarnpkg.com/)
- [Docker](https://www.docker.com/)
- GNU Make

## API
1. Clone the [API repository](https://github.com/fapinstructor/fapinstructor-api)
```bash
git clone https://github.com/fapinstructor/fapinstructor-api.git
```
2. Configure your `.env` file under server. Use `.env.example` as a reference
3. Start the docker containers. This will build and start the docker container with an attached log watcher.
```bash
make start
```
4. Application is ready for HTTP requests localhost:9000/ 

## Client
To clone and set up the client execute the following commands.

```bash
git clone https://github.com/fapinstructor-client.git
cd fapinstructor-client
yarn install
yarn start
```

This runs the app in the development mode.  
Open http://localhost:3000 to view it in the browser.

`yarn build` builds the app for production to the build folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!
