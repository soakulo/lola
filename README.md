<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/b32e853b-5495-4123-9463-6ae3ae9e9bdb

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Запуск в Docker на порту 8080

Собрать образ:

```sh
docker build -t lola-app .
```

Запустить контейнер с доступом к приложению на `http://localhost:8080`:

```sh
docker run --rm -p 8080:8080 lola-app
```
