# reunion-2019

BTW '04 Class Reunion 2019 website

## Development

### Prerequisites

- [Node](https://nodejs.org/en/) version 10.15.x
- [direnv](https://direnv.net/)
- The [CF CLI](https://github.com/cloudfoundry/cli)
- The [cf-puppeteer](https://github.com/HappyTobi/cf-puppeteer) CF plugin

### Install

```bash
cp environments/example.envrc environments/test.envrc
cp environments/example.envrc environments/prod.envrc
# edit test.envrc and prod.envrc and replace with valid values
scripts/env.sh set test
direnv allow
btw install
```

### Run tests

```bash
npm run unit   # runs backend tests.
npm test       # runs web tests. assumes app is running locally
btw test       # runs all tests. starts and stops a test app
```

### Run the app

Server-only:

```bash
npm --prefix ui-web run build
npm start
```

The server runs on port 2004 by default (configurable via `PORT`).

Start the UI development server (or "dev server") locally:

```bash
npm --prefix ui-web start
```

The dev server runs on port 3000 and proxies backend calls to `http://localhost:2004`.

## Deploy

1. Set your environment to `test` or `prod`.

   ```bash
   btw env set test    # or prod
   ```

   If you have changed your environment recently, you will be prompted to run `direnv allow`.

1. Build, test, and deploy to PCF:

   ```bash
   btw ship
   ```
