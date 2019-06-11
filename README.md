# CornerCoffee
A Node.js ES6 REST API
## Documentation
API Documentation can be found at:  https://documenter.getpostman.com/view/1588301/S1TZzbyP?version=latest

## Installation

#### Pre-requisites
- [Docker](https://docs.docker.com/install/)
- [Docker compose](https://docs.docker.com/compose/install/)

Download or clone the repository, open a terminal inside the folder and run:

```
docker-compose build
```
This will build two containers. A mongodb for the database, and a Node.js where our API application will run.

## Usage
#### Start
Start the containers:
```
docker-compose up
```
This will start the containers. The containers are configured for development, so a change in the code will be applied to the API container and will restart it.

#### Logging
Use docker logs for better visualization
```
docker logs -f api_server
```


## Testing
#### Manual testing
If the db has no users, it will be populated with one of each role. (admin and customer)

[Postman](https://www.getpostman.com/) is recommended for manually testing. There is a postman collection [here](test/CornerCoffee.postman_collection.json). Import it into Postman in order to have a set of requests ready to be used.
Remember to change the jwt in the authorization headers to test the request as different user roles.
