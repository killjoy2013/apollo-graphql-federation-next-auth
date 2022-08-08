## Introduction

We created a GraphQL Federated Api with below subgraphs (microservices);

- auth
- country
- food
- people

Also we have a **gateway** to orchestrate them.

As a frontend, we created a Nest.js to consume our federated GraphQL backend

My node & npm version `v16.15.1` & `8.11.0` respectively.

## Installation

Before installing the dependencies, you may need to run `yarn cache clean -f` to avoid possible conflicts.

Navigate to each directory listed below & run `yarn`

- auth
- country
- food
- people
- gateway
- web

## Running existing projects

If you'd like to run the final version, checkout the branch `04-next-auth-jwt-credentials`.

There is `docker-compose.yaml` file in the root directory of the project. You need to run in by `docker-compose up`. This will create separate postgresql databases for each microservice.

Navigate to below directories and run `yarn start:dev`

- auth
- country
- food
- people

Then navigate to `gateway` and run `yarn start:dev` again.

Now, navigate to web and run `yarn dev`

If everything went alright by now, you can navigate to [http://localhost:3000](http://localhost:3000)

There are two default users, `admin` & `customer` you can login with any of them. You can enter anything as password
