# Boilerplate Web App for SaaS
### Typescript React Webpack 4 boilerplate for quickly starting up projects with minimal effort.

## NOTE: This project is a work in progress.

Open source web app that saves you weeks of work when building your own SaaS product.

This boilerplate to launch the following SaaS businesses:

## Features
- User authentication
- Production-ready, scalable architecture
- Developer automation to minimize manual processes:
  - Prettier
  - Stylelint
  - Eslint
  - Husky
  - Commitlint
- **Subscriptions with `Stripe`**:
  - subscribe/unsubscribe Team to plan,
  - update card information,
  - verified Stripe webhook for failed payment for subscription.

## TODO - In Order
 * [] Basic Login and registration - with sessions
 * [] Graphql Login - using saas-backend-boilerplate
 * [] OAuth Login ( Microsoft, Google )
 * [] Account Overview
 * [] Stripe
 * [] Permission Based Routes ( Role, Admin , Guest)
 * [] Chunking
 * [] Paypal
 * [] Docker
 * [] Google Analytics
 * [] Jest


## Built with
- [React]()
- [Ant Design]()
- [Mobx]()
- [Typescript]()
- [SCSS]()


### Commit Standards

When committing within this project `commitlint` is used to parse commit messages.

`commitlint` checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).

Example

```sh
type(scope?): subject  #scope is optional
```

Real world examples can look like this:

```
chore: fix linting issues
```

```
docs(git): explained new standards
```

```
feat(blog): added comment section
```

### Common Types

Common types according to [commitlint-config-conventional (based on the the Angular convention)](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum) can be:

- **build:** Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci:** Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **chore:** Changes that do not affect the meaning of the code (white-space, formatting, etc.)
- **docs:** Documentation only changes
- **feat:** A new feature
- **fix:** A bug fix
- **perf:** A code change that improves performance
- **refactor:** A code change that neither fixes a bug nor adds a feature
- **test:** Adding missing tests or correcting existing tests

More information on this standard can be found [here.](https://github.com/conventional-changelog/commitlint)
