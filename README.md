# QMS

Quote Management System

## How to run the product

QMS product has been containerized and can run inside Docker.

### Build

```sh
> docker-compose build
```

This command will build docker images for every single microservice and QMS web application.

### Run

```sh
> docker-compose up
```

#### Run in the background

```sh
> docker-compose up -d
```

### Check container status

```sh
> docker-compose ps
```

**Note:** Don't forget to run [database migrations](./common/db/README.md) after you started your containers!

### Stop

To stop all containers execute this command:

```sh
> docker-compose down
```

## How to run an individual microservice / application

### With Docker

```sh
> docker-compose up <service_name>
```

### Without Docker

First we need to enter a directory with the service / application source code.

```sh
> cd auth-service
```

Install all dependencies.

```sh
> npm install
```

Run service or application.

```sh
> npm start
```

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f https://gitlab.com/iquote/qms.git master:qms
