# ChatApp Skeleton

## Initialization

```
cd api-client
yarn
cp .env.example .env

cd ../web-client
yarn
cp .env.example .env
```

Edit both **.env** files

## Analyze the bundle

```
yarn analyze
```

A browser window will open with the bundle components analysis

## Embedding

Change **localhost:3000** below to your API server address

* Embed via script

  Add to the body of your page:

  ```
  <script api_key="12345" src="http://localhost:3000/chat.js"></script>
  ```

* Embed via iframe

  Add to the body of your page:

  ```
  <iframe src="http://localhost:3000/iframe.html?api_key=12345"></iframe>
  ```

## Run Development

First terminal window:

```
cd web-client
yarn dev
```

Second terminal window:

```
cd api-server
yarn dev
```

Now open in your browser:

* http://localhost:5000/script-example.html
* http://localhost:5000/iframe-example.html
