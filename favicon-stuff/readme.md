# Initial Fav Icon Details

Auto generated from: https://www.favicon-generator.org/

## HTML

- Download your favicon package.
- Extract this package in the root of your web site. If your site is http://www.example.com, you should be able to access a file named http://www.example.com/favicon.ico.
- Insert the following code in the <head> section of your pages:

```html
<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="shortcut icon" href="/favicon.ico" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="apple-mobile-web-app-title" content="Beyond The Build" />
<link rel="manifest" href="/site.webmanifest" />
```

- Make sure your favicon is properly setup:

https://example.com

Check
or if your web site runs locally, run npx realfavicon check <port>

## Next.js App

- Download the app files
  and extract them to <your next app>/src/app.
  Because these files follow Next.js conventions, the corresponding HTML markups will be automatically generated.

- Download the public files and extract them to <your next app>/public.
  Insert the following code in the head section of <your next app>/src/app/layout.tsx:
  ```html
  <meta name="apple-mobile-web-app-title" content="Beyond The Build" />

- Start your application: npm run dev

- Make sure your favicon is properly setup: npx realfavicon check 3000
