# reunion-2019

BTW '04 Class Reunion 2019 website

## Development

Install:

```bash
cp environments/example.envrc environments/test.envrc
cp environments/example.envrc environments/prod.envrc
# edit test.envrc and prod.envrc and replace with valid values
scripts/env.sh set test
direnv allow
btw install
```

Run tests:

```bash
npm run unit   # runs backend tests.
npm test       # runs web tests. assumes app is running locally
btw test       # runs all tests. starts and stops a test app
```

Start the app locally:

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

## Deployment

Build, test, and deploy to PCF (requires `cf` CLI):

```bash
btw ship prod    # deploy using ./manifest.yml
btw ship test    # deploy using ./manifest-test.yml
```
