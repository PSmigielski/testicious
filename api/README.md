
# Pepper pizza API

This is an API for pepper pizza page



## Run API Locally

Clone the project

```bash
  git clone git@github.com:PSmigielski/pizzeria.git
```

Go to the project directory

```bash
  cd pizzeria/api
```


Install dependencies with npm

```bash
  npm install
```

**REMEMBER TO CREATE .env FILE**

Run docker-compose to setup database

```bash
  docker-compose up
```

Run migrations and seed the database

```bash
  npx prisma migrate dev
  npx prisma db seed
```

Run api 

```bash
  npm run dev
```

or build it and run

```bash
  npm run build
  npm start
```



## Authors

- [@PSmigielski](https://github.com/PSmigielski)
- [@BsUrbk](https://github.com/BsUrbk)