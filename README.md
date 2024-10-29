# CE Technical Test README

## Prerequisites

Node.js and npm: Ensure that Node.js and npm are installed on your machine. You can download Node.js, which includes npm, from nodejs.org.

## How to run

- Clone this repository to a folder of your liking and enter it
- Open a Terminal in that folder and install all the dependencies with the following command:
```npm install```

- To set up the Prisma database run the following command:
```npx prisma migrate dev --name init```
(This command will create the necessary tables in the database following the schema)
- Run the following command as well to generate the Prisma client
```npx prisma generate```

- Finally to run the project just use:
```npm run dev```

## Project Structure

- /app: Contains the Next.js App Router pages, including the user list, registration form, and API routes.
- /components: Reusable components, such as the CustomInput component for input fields.
- /lib: Includes utility files, like the Prisma instance.
- /prisma: Contains the Prisma schema (schema.prisma), which defines the database structure.
- .env: Environment variables for configuring the database and other secrets.

## Technologies Used

- Next.js: Framework for building React applications with server-side rendering.
- Prisma: Database ORM for defining and managing the schema and database migrations.
- TanStack Query: For handling data fetching, caching, and updating.
- Axios: For making HTTP requests.
