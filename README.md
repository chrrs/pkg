<center><img src=".github/banner.png" /></center>

> Easy-to-use common maven repository index.

![Version](https://img.shields.io/github/package-json/v/SlagHoedje/pkg?style=flat-square)
![Lints](https://img.shields.io/github/checks-status/SlagHoedje/pkg/master?style=flat-square)
![Deployment](https://img.shields.io/badge/deployed%20on-vercel-black?style=flat-square)

Finding maven packages is hard. Sure, sites like [mvnrepository](https://mvnrepository.com) and the official [maven search](https://search.maven.org) exist, but all of them are either very messy, or don't provide enough information. That's why I decided to build my own repository explorer.

## Deployment

As this is a SvelteKit project, you might need to add your own [adapters](https://kit.svelte.dev/docs#adapters) to the Svelte config.

```sh
yarn
yarn build
```

As the GitHub API is used in this project, without authentication, the API is rate-limited to 60 requests _per hour_. As this is quite low, there is support for manually adding
a GitHub OAuth token by setting the `GITHUB_TOKEN` environment variable to the desired OAuth token. This can of course also be done by using a `.env` file.

## Development setup

After starting the development server, the endpoint is logged in the terminal. Navigating to this URL will put you on the homepage.

```sh
yarn
yarn dev
```

## Credits

-   [lib.rs](https://lib.rs/), [mvnrepository](https://mvnrepository.com), [Maven Search](https://search.maven.org) and [npm](https://npmjs.org) for general inspiration of this site.
-   [JetBrains package-search](https://package-search.jetbrains.com/) for providing the API.
