# CE Technical Test

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

- And open your browser using the following url:
```localhost:3000/```

## Usage

- To access any page with data you need to be logged in, if you don't have a account you can create a new one in the Sign Up button on the login page.

- In the Dashboard there is a counter for how much users are registered in the database and have the status as active.
- In the Users page, you can see a paginated list of the current users registered.
- In the top bar you have a debug menu with 2 buttons to add or remove pre-defined users so you don't have to register every single one manually.

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
