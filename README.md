# reunion-2019

BTW '04 Class Reunion 2019 website

## Development

Install:

```bash
npm install
cp ui-web/.env.example ui-web/.env
// edit ui-web/.env and replace with client id and secret
```

Run tests:

```bash
npm test          # assumes app is running locally
scripts/test.sh   # starts and stops a test app
```

Start the app locally:

```bash
npm run build
npm start
```

The server runs on port 2004 by default (configurable via `process.env.PORT`).

Start the UI development server (or "dev server") locally:

```bash
cd ui-web
npm start
```

The dev server runs on port 3000 and proxies backend calls to `http://localhost:2004`.
