# reunion-2019

BTW '04 Class Reunion 2019 website

## Development

Install:

```bash
cp .envrc.example .envrc
# edit .envrc and replace with valid values
direnv allow
npm install
```

Run tests:

```bash
npm test   # assumes app is running locally
btw test   # starts and stops a test app
```

Start the app locally:

```bash
npm run build
npm start
```

The server runs on port 2004 by default (configurable via `process.env.PORT`).

Start the UI development server (or "dev server") locally:

```bash
npm --prefix ui-web start
```

The dev server runs on port 3000 and proxies backend calls to `http://localhost:2004`.

## Deployment

Build, test, and deploy to PCF (requires `cf` CLI):

```bash
btw ship prod    # deploy using ./manifest.yml
btw ship test    # deploy using ./manifest-test.yml
```
