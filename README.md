# Pomelo NextJs Code Testing

## Pages

- Home Most Viewed Page
- Search Articles Page
- Detail Page

## Features

- Home page have top viewed news in 1,7,30 days and redirect to detail page.
- Search articles with user input and go to detail page.
- Every page is reponsive for every platforms.


## Installation

Next js 13 requires [Node.js](https://nodejs.org/) v16+ to run.
First get the api key from [NYTimes](https://developer.nytimes.com/)

```sh
cp .env.example .env
```
Paste the API key to NEXT_PUBLIC_NYTIMES_API_KEY in .env
```sh
npm i
npm run dev
```

