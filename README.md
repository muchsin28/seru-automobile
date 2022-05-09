# SERU Automobile API-v.1.0

##

## Table of Contents

### A. About SERU Automobile API

SERU Automobile API is a JSON API that can be use for managing vehicle store

##

### B. Built With

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)

##

### C. Entity list

The following is a list of Entity used in the SERU Automobile API.

- User
- Brand
- Type
- Model
- Year
- Price

##

### D. Getting Started

This section is an overview of the SERU Automobile API documentation and related resources.

#### D.1. Prerequisites

Developers need to have this software installed on their machine:

**Git**

- Windows
  Download from this [link](https://git-scm.com/download/win)
- Linux

  If you're on Fedora (or any closely-related RPM-based distribution, such as RHEL or CentOS), you can use `dnf`:

  `dnf install git-all`

  If you're on a Debian-based distribution, such as Ubuntu, try `apt`:

  `apt install git-all`

- macOS

  On Mavericks (10.9) or above you can do this simply by trying to run `$ git --version` from the Terminal the very first time. If you don't have it installed already, it will prompt you to install it.

  or

  Download from this [link](https://git-scm.com/download/mac)

**Node.js**

- Windows
  Download from this [link](https://nodejs.org/en/download/)
- Linux

  If you're on Fedora (or any closely-related RPM-based distribution, such as RHEL or CentOS), you can use `dnf`:

  `dnf module install nodejs:12`

  If you're on a Debian-based distribution, such as Ubuntu, try `apt`:

  `apt install nodejs`

- macOS

  Download from this [link](https://nodejs.org/en/download/)

**PostgreSQL**

- Windows
  Download from this [link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)
- Linux

  If you're on Fedora (or any closely-related RPM-based distribution, such as RHEL or CentOS), you can use `dnf`:

  `dnf module list postgresql`

  `dnf module enable postgresql:12`

  If you're on a Debian-based distribution, such as Ubuntu, try `apt`:

  `apt install postgresql postgresql-contrib`

- macOS

  On Mac OS X Download from this [link](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)

#### D.2. Installation

1. Clone the repo

   ```
   git clone https://github.com/muchsin28/seru-automobile.git
   ```

2. Install NPM packages

   ```
   npm install
   ```

3. Create your own .env file like the example given on .env.example

4. Migrate table structure using Sequelize

   ```
   sequelize db:migrate
   ```

5. Seed the table using Sequelize

   ```
   sequelize db:seed:all
   ```

6. Start local development server

   ```
   npm run dev
   ```

##

### E. Documentation

1. Desktop : Import collection file (SERU-Automobile.postman_collection.json) to postman desktop app
2. Online : Postman Documentation [https://documenter.getpostman.com/view/13590050/Uyxeonso](https://documenter.getpostman.com/view/13590050/Uyxeonso)
