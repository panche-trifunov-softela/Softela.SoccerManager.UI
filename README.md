# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.

## Deploying

The app runs on Azure Static Web Apps (Free plan) as `soccermanager-ui` in resource group
`soccerteambuilder`, at https://the11master.com.

Every push to `main` runs `.github/workflows/deploy.yml`: it builds on Node 22 and uploads `dist`.
It can also be started by hand from the Actions tab.

`public/staticwebapp.config.json` holds the hosting rules, and the build copies it into `dist`:

- a path that is not a file serves `index.html`, so refreshing a route works;
- a missing file under `/assets/` returns 404 instead of the app;
- every response carries `Cache-Control: no-cache` except the hashed files under `/assets/`, which are
  cached for a year, so a change to `public/config.js` is picked up on the next load.

`public/config.js` ships as it is. Its `api.baseUrl` still points at the local API until the API is
deployed.

One-time setup:

1. Create the Static Web App with deployment source **Other**.
2. Store its deployment token (Overview → Manage deployment token) as the repository secret
   `AZURE_STATIC_WEB_APPS_API_TOKEN`.
3. In Keycloak, add `https://the11master.com/*` to the `soccermanager-spa` client's Valid redirect URIs
   and `https://the11master.com` to its Web origins.
4. Under Custom domains, add `the11master.com` and then `www` with **Custom domain on Azure DNS**, and
   set `the11master.com` as the default. The zone's TXT record at `@` also holds Brevo's domain
   verification code (`brevo-code:…`); keep it.

## Credits

Icons: [Font Awesome Free](https://fontawesome.com) 6.7.2 by Fonticons, Inc., used under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (icons) and the
[MIT License](https://opensource.org/licenses/MIT) (code). See https://fontawesome.com/license/free.
