/**
 * Runtime configuration, read by the app before it renders. Deployed values
 * only — a machine-specific override goes in `config.development.js` beside
 * this file: gitignored, preferred by the dev server, never shipped by a build.
 */
window.APP_CONFIG = {
  keycloak: {
    url: 'https://soccermanager-keycloak.purpleforest-8cd37416.eastus.azurecontainerapps.io',
    realm: 'soccermanager',
    clientId: 'soccermanager-spa',
  },
}
