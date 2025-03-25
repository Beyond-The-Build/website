# BTB-Blog

This Beyond The Build website that uses [Next.js][nextjs] for the frontend and [Sanity][sanity-homepage] to handle its content. It comes with a native Sanity Studio that offers features like real-time collaboration and visual editing with live updates using [Presentation][presentation].

The Studio connects to Sanity Content Lake, which gives you hosted content APIs with a flexible query language, on-demand image transformations, powerful patching, and more. You can use this starter to kick-start a personal website or learn these technologies.

## Features

- A performant, static personal website with editable projects, podcasts and speakers
- A native and customizable authoring environment, accessible on `beyondthebuild.dev/studio`
- Real-time and collaborative content editing with fine-grained revision history
- Side-by-side instant content preview that works across your whole site
- Support for block content and the most advanced custom fields capability in the industry
- Webhook-triggered Incremental Static Revalidation; no need to wait for a rebuild to publish new content
- Free Sanity project with unlimited admin users, free content updates, and pay-as-you-go for API overages
- Starter-friendly and not too heavy-handed TypeScript and Tailwind.css

## Table of Contents

- [Features](#features)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
  - [Important files and folders](#important-files-and-folders)
- [ Getting Started](#getting-started)

  - [Step 1. Run app locally in development mode](#run-app-locally-in-development-mode)
  - [Step 2. Open the app and sign in to the Studio](#open-the-app-and-sign-in-to-the-studio)
- [Adding content with Sanity](#adding-content-with-sanity)
  - [Step 1. Publish your first document](#publish-your-first-document)
  - [Step 2. Extending the Sanity schema](#extending-the-sanity-schema)
- [Conventional Commits](#conventional-commits)
- [Questions and Answers](#questions-and-answers)
  - [It doesn't work! Where can I get help?](#it-doesnt-work-where-can-i-get-help)
  - [How can I remove the "Next steps" block from my personal site?](#how-can-i-remove-the-next-steps-block-from-my-personal-website)
- [Next steps](#next-steps)

## Project Overview

| [Personal Website](https://template-nextjs-personal-website.sanity.build/)                                                | [Studio](https://template-nextjs-personal-website.sanity.build/studio)                                                 |
| ------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| ![Personal Website](https://user-images.githubusercontent.com/6951139/206395107-e58a796d-13a9-400a-94b6-31cb5df054ab.png) | ![Sanity Studio](https://user-images.githubusercontent.com/6951139/206395521-8a5f103d-4a0c-4da8-aff5-d2a1961fb2c0.png) |

### Important files and folders

| File(s)                                                    | Description                                             |
| ---------------------------------------------------------- | ------------------------------------------------------- |
| `sanity.config.ts`                                         | Config file for Sanity Studio                           |
| `sanity.cli.ts`                                            | Config file for Sanity CLI                              |
| `/app/studio/[[...tool]]/Studio.tsx`                       | Where Sanity Studio is mounted                          |
| `/app/api/revalidate/route.ts`                             |  Serverless route for triggering ISR                    |
| `/app/api/draft-mode/enable/route.ts`                      | Serverless route for triggering Draft mode              |
| `/sanity/schemas`                                          | Where Sanity Studio gets its content types from         |
| `/sanity/plugins`                                          | Where the advanced Sanity Studio customization is setup |
| `/sanity/loader/loadQuery.ts`,`/sanity/loader/useQuery.ts` | Configuration for the Sanity Content Lake client        |

## Getting Started

#### 1. Run app locally in development mode

Navigate to the template directory using `cd <your app name>`, and start the development servers by running the following command
Ensure you have ([Node Version Manager](https://github.com/nvm-sh/nvm#installing-and-updating)) installed, then run:

```shell
nvm install
npm install
npm run dev
```

#### 2. Open the app and sign in to the Studio

Open the Next.js app running locally in your browser on [http://localhost:3000](http://localhost:3000).

Open the Studio by navigating to the `/studio` route [http://localhost:3000/studio](http://localhost:3000/studio). You should now see a screen prompting you to log in to the Studio. Use the same service (Google, GitHub, or email) that you used when you logged in to the CLI.


Now that you’ve deployed your Next.js application and Sanity Studio, you can optionally invite a collaborator to your Studio. Open up [Manage](https://www.sanity.io/manage), select your project and click "Invite project members"

They will be able to access the deployed Studio, where you can collaborate together on creating content.

## Conventional Commits

This repository uses Conventional Commits to maintain a structured commit history, enabling automated release notes and changelogs.

### Optional

When running `git commit`, it will often:

- Start the Commitizen prompt, but forget your original commit message, and
- Sometimes open your editor after the prompt finishes, asking you to re-confirm or rewrite the message.

To avoid this confusion and make the commit process smoother, you can use `git cz` as a shortcut:
```shell
git config --local alias.cz '!npx cz'
```

### What’s Configured?

#### Installed Packages

The following development dependencies are installed:

- [`commitizen`](https://www.npmjs.com/package/commitizen)
- [`@digitalroute/cz-conventional-changelog-for-jira`](https://www.npmjs.com/package/@digitalroute/cz-conventional-changelog-for-jira)
- [`@commitlint/cli`](https://www.npmjs.com/package/@commitlint/cli)
- [`@commitlint/config-conventional`](https://www.npmjs.com/package/@commitlint/config-conventional)
- [`husky`](https://www.npmjs.com/package/husky)

#### Configuration Files

| File                | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `.commitlintrc`     | Configures commit message linting rules.                       |
| `.czrc`             | Sets up Commitizen to use Jira-style commit messages.          |
| `.husky/commit-msg` | Ensures commits are always prefixed with [TICKET] or [BRANCH]. |

## Questions and Answers

### It doesn't work! Where can I get help?

In case of any issues or questions, you can post:

- [GitHub Discussions for Next.js][vercel-github]
- [Sanity's GitHub Discussions][sanity-github]
- [Sanity's Community Slack][sanity-community]

### How can I remove the "Next steps" block from my personal website?

You can remove it by deleting the `IntroTemplate` component in `/app/(personal)/layout.tsx`.

## Next steps

- [Join our Discord community to ask questions and get help][discord-community]
- [How to edit my content structure?][sanity-schema-types]
- [How to query content?][sanity-groq]
- [What is content modelling?][sanity-content-modelling]

[vercel-deploy]: https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsanity-io%2Ftemplate-nextjs-personal-website&project-name=nextjs-personal-website&repository-name=nextjs-personal-website&demo-title=Personal+Website+with+Built-in+Content+Editing&demo-description=A+Sanity-powered+personal+website+with+built-in+content+editing+and+instant+previews.+Uses+App+Router.&demo-url=https%3A%2F%2Ftemplate-nextjs-personal-website.sanity.build%2F&demo-image=https%3A%2F%2Fuser-images.githubusercontent.com%2F6951139%2F206395107-e58a796d-13a9-400a-94b6-31cb5df054ab.png&integration-ids=oac_hb2LITYajhRQ0i4QznmKH7gx&external-id=nextjs%3Btemplate%3Dtemplate-nextjs-personal-website
[integration]: https://www.sanity.io/docs/vercel-integration?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[`.env.local.example`]: .env.local.example
[nextjs]: https://github.com/vercel/next.js
[sanity-create]: https://www.sanity.io/get-started/create-project?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-deployment]: https://www.sanity.io/docs/deployment?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-homepage]: https://www.sanity.io?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[discord-community]: https://discord.gg/ajsktDKN
[sanity-community]: https://slack.sanity.io/
[sanity-schema-types]: https://www.sanity.io/docs/schema-types?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-github]: https://github.com/sanity-io/sanity/discussions
[sanity-groq]: https://www.sanity.io/docs/groq?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-content-modelling]: https://www.sanity.io/docs/content-modelling?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[sanity-webhooks]: https://www.sanity.io/docs/webhooks?utm_source=github.com&utm_medium=referral&utm_campaign=nextjs-v3vercelstarter
[localhost-3000]: http://localhost:3000
[localhost-3000-studio]: http://localhost:3000/studio
[vercel]: https://vercel.com
[vercel-github]: https://github.com/vercel/next.js/discussions
[personal-website-pages]: https://github.com/sanity-io/template-nextjs-personal-website
[presentation]: https://www.sanity.io/docs/presentation
