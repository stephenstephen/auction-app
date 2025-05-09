# auction-app

## Prerequisite

- Node.js 20.7.0
- PostgreSQL (14 or above)

---

## Backend & Database

### Database

- **Database**: PostgreSQL
- **ORM**: [MikroORM](https://mikro-orm.io/docs/)

---

### Setup

1. Go to the backend folder:
   `cd auction-backend`
2. Install dependencies:
   `yarn install`
3. Configure the database in `database/mikro-orm.config.ts`:
   ```
        export default {
            type: "postgresql",
            dbName: "auction-db",
            user: "your-username",
            password: "your-password",
            host: "localhost",
            port: 5432,
            ...other options
        };
   ```
4. Apply database migrations:
   `yarn run migration:up`
5. Seed the database:
   ```
        npx ts-node database/seeding/seed.ts users ./database/seeding/data/users.csv
        npx ts-node database/seeding/seed.ts auctions ./database/seeding/data/auctions.csv
        npx ts-node database/seeding/seed.ts bids ./database/seeding/data/bids.csv
   ```

---

### Running the Backend

- Start the backend in development mode:
  `yarn run dev`

---

### Managing Migrations

1. If you make changes to database entities, create a new migration:
   `yarn run migration:create`
2. Apply the latest migrations:
   `yarn run migration:up`

---

### Resetting the Database

To reset the database, delete the `pgdata` directory.

---

## Frontend

### Setup

1. Go to the frontend folder:
   `cd auction-frontend`
2. Install dependencies:
   `yarn install`

---

### Running the Frontend

- Start the app in development mode:
  `yarn start`
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

### Other Commands

- Run tests interactively:

  `yarn test`

  See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

- Build the app for production:
  `yarn build`
  This builds the app for production in the `build` folder and optimizes the app for best performance.

---

## Dockerization Requirement

This project does not include Docker configurations. As a part of the project setup, you are required to:

1. Dockerize the **backend** and **frontend**.
2. Dockerize the **database** (PostgreSQL).

Ensure that both services can communicate effectively within a Docker network. Provide documentation for running the Dockerized application as part of your submission.
