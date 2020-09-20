# Welcome to project
*Observations*:  Go to .env. files into base folder project to configure api, a `.env.dev` is a development file and `.env.prod` is a production file

## Instaling dependencies (Api and Web App)

```js
  cd produtos-app/api
  npm install // or yarn install

  cd produtos-app/app
  npm install // or yarn install
```


### Option 1 - Running project with docker-compose

#### 1.A - Running API
```js
cd produtos-app/api

// Create network
docker network create selecao-network

// Running database on docker
docker run -d \
--name mysqldb \
-v $HOME/dbdata2:/var/lib/mysql \
-p 3306:3306 \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=PRODUTOSDB \
--network=selecao-network \
mysql:latest 

// Buinding API with docker
docker build -t processoseletivo/api:v1 -f Dockerfile .

// Runing API with docker
docker run -d \
--name api \
--network=selecao-network \
-p 3333:3333  processoseletivo/api:v1


// Running migrations
docker exec -it api bash
npm run db:migrate

```

#### 1.B - Running APP
```js
cd produtos-app/app

// Building APP with docker
docker build -t processoseletivo/api:v1 -f Dockerfile .

// Runing APP with docker
docker run -it --rm \
--name app \
--network=selecao-network \
-e NODE_ENV=production \
-p 3000:3000 processoseletivo/app:v1

```


### Option 2 - Running project with npm or yarn

#### 2.A - Running api
- Go to api  project folder and open *.env.dev* file to config environment variables  (Database Access, Server Port, ...)
```js
  // Go to api folder
  cd produtos-app/api

  // Open *.env.dev* file and config enviroment variables

  // CONFIG API PORT
  PORT=3333

  // mysql = mysql version <= 5
  // mysql2 = mysql version > 5(Supports mysql 8 version)
  DATABASE_DIALECT=mysql2

  // mysql host to connect
  DATABASE_HOST=localhost

  // mysql databasename
  DATABASE_NAME=PRODUTOSDB

  // mysql user
  DATABASE_USER=root

  // mysql password
  DATABASE_PASSWORD=root

  // mysql min pool, default is 2
  DATABASE_MIN_POOL=2

  // mysql max pool, default is 10
  DATABASE_MAX_POOL=10
```


##### - Running migrations

```js
  // or yarn db:migrate
  npm run db:migrate
```

##### - Starting api

```js
  // or yarn start
  npm start
```


### 2.B - Running APP

#### 2.A - Running api
- Go to api  project folder and open *.env.dev* file to config environment variables  (Api Access, Server Port, ...)

```js
  // Go to api folder
  cd produtos-app/api

// starting
  npm start
```