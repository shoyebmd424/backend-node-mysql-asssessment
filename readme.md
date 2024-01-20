# Backend Development - Assignment -101

## Library and Database

- **Database:** MySQL
- **Library for Node.js to Connect with MySQL:** Sequelize
- **Server:** Express.js
- **Middlewares:**
  - **Cors:** Used for client-side connection with the server and unblocking requests.
  - **Dotenv:** Used for accessing values from environment variables.
  - **Nodemon:** Used to run the server with auto-restart on project save.
  - **Sequelize:** ORM (Object-Relational Model) library for easy mapping of objects with MySQL tables.

## Created Tables

1. **Poll Table** (`title`, `category`, `startDate`, `endDate`, `minReward`, `maxReward`)
2. **Questions Table** (`type`, `text`, `options`)
3. **User Table** (`name`)
4. **Vote Table** (`id`, `reward`, `answer`)
5. **Analytics Table** (`totalVotes`, `optionsCounts`)

All table definitions are found in `/model` directory.

## Relationships Between the Tables

1. **Poll - Questions:** One-to-Many relationship
2. **User - Questions:** Many-to-Many relationship
3. **Vote - Questions:** One-to-Many relationship
4. **Poll - Analytics:** One-to-One relationship

All relationships are defined in `/model/index.js`.

## API Endpoints

### Poll Creation

- **Endpoint:** POST `/poll`
- **Description:** Create a new poll with details, including question sets.

### Fetching All Created Polls

- **Endpoint:** GET `/poll`
- **Description:** Retrieve a list of all created polls with essential details.

### Update a Particular Poll

- **Endpoint:** PUT `/polls/:pollId`
- **Description:** Update details of a specific poll, including its question sets.

### Questions Creation

- **Endpoint:** POST `/questions`
- **Description:** Create a new poll with details, including question sets.

### Fetching All Created Questions

- **Endpoint:** GET `/questions`
- **Description:** Retrieve a list of all created polls with essential details.

### Update a Particular Question Set

- **Endpoint:** PUT `/questions/:questionId`
- **Description:** Update details of a specific question set.

### Fetch User Polls and Serve Questions

- **Endpoint:** GET `/poll/vote/:userId`
- **Description:** Fetch polls for a user, serving questions one at a time based on voting history.

### Submit a Poll

- **Endpoint:** POST `/user/:userId/submit-poll`
- **Description:** Submit a poll with the selected option, calculate rewards, and store analytics.

### Fetch Poll Analytics

#### For a Particular Poll

- **Endpoint:** GET `/user/:pollId/analytics`
- **Description:** Retrieve analytics for a specific poll, including total votes and option counts.

#### Overall Poll Analytics

- **Endpoint:** GET `/user/analytics`
- **Description:** Fetch overall analytics for all polls, including total votes and option counts.
