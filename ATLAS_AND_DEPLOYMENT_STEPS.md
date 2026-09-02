# MongoDB Atlas and Render Setup

These account-specific steps finish exercises 3.10, 3.12, and 3.21.

## 1. Create the Atlas database

1. Create a free MongoDB Atlas project and cluster.
2. Create a database user with a strong password.
3. Configure Atlas Network Access for your local computer and deployment host.
4. Copy the Node.js connection string and select `phonebookApp` as the database.

## 2. Configure the backend locally

In `part3/phonebook-backend`, copy `.env.example` to `.env`:

```powershell
Copy-Item .env.example .env
```

Replace the placeholders in `MONGODB_URI` with the real Atlas values. Keep
`.env` private; it is excluded by `.gitignore`.

For `mongo.js`, also configure `MONGODB_URI_TEMPLATE` and keep the literal
`<password>` placeholder where the password belongs.

## 3. Test the database

```powershell
node mongo.js yourpassword "Harsh Wardhan" 040-12345678
node mongo.js yourpassword
npm run dev
```

Test these addresses:

- `http://localhost:3001/api/persons`
- `http://localhost:3001/info`
- `http://localhost:3001/`

## 4. Deploy with Render

1. Push the completed `part3` folder to GitHub.
2. In Render, create a Blueprint from the repository using `render.yaml`, or
   create a Node Web Service with root directory `part3/phonebook-backend`.
3. Set `MONGODB_URI` as a secret environment variable.
4. Use `npm install` as the build command and `npm start` as the start command.
5. Test `/`, `/api/persons`, and `/info` on the deployed URL.
6. Put the deployed URL into the main Part 3 README and push that change.

Never commit `.env`, database passwords, or connection strings containing
credentials.

