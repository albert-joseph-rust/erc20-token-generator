const vars = require('./.env.json');

module.exports = {
  description: 'Create your own ERC20 Smart Contract without coding. ERC20 Generator is the easiest and fastest way to create your own ERC20 token on the Ethereum network. No coding skills are required.',
  base: '/',
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: 'https://digiswap-core.github.io/erc20-generator/assets/images/erc20-token-generator.png' }], // eslint-disable-line max-len
    ['meta', { property: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { property: 'twitter:image', content: 'https://digiswap-core.github.io/erc20-generator/assets/images/erc20-token-generator.png' }], // eslint-disable-line max-len
    ['script', { src: '/assets/js/web3.min.js' }],
    ['script',
      {
        src: 'https://cdn.jsdelivr.net/npm/cookie-bar/cookiebar-latest.min.js?forceLang=en&theme=momh&thirdparty=1&always=1&noGeoIp=1&scrolling=1&hideDetailsBtn=1', // eslint-disable-line max-len
        defer: true,
      },
    ],
  ],
  plugins: [
    ['@vuepress/google-analytics', {
      ga: vars.gaId,
    }],
    ['vuepress-plugin-facebook-pixel', {
      pixelId: vars.fbPixelId,
    }],
  ],
  defaultNetwork: vars.defaultNetwork,
  serviceReceiver: vars.serviceReceiver,
};
