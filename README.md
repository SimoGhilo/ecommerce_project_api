# ecommerce_project_api by Simone Ghilotti


## E-Market

PERN app that provides typical functionality found in an ecommerce website.  Customers can register, view products, create a cart, and place/view orders.
Customers can either log in using the normal log-in functionality provided by the website or they can alternatively log-in via a third party service (Google).


## Running the app

To run locally, `npm install`, then `npm run start`

This repo includes an `example.env` file that contains important environment variables for reference.  Make sure to create a `.env` file and include all variables found in the `example.env` file, replacing the example values with those specific to your environment/needs.

Once the app is running locally, you can access the API at `http://localhost:<your-port>`

## Testing

Swagger documentation available at `http://localhost:<your-port>/api-docs`

You can use various HTTP clients such as [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to make requests to the API endpoints.


## Database

Please note that you need to have postbird installed in order to be able to access the information present in the database.

This project requires a [PostgreSQL](https://www.postgresql.org/) database to be running locally.  Reference the ERD diagram located in the `resources` folder of this repo to view the structure of the tables.  You can use [pgAdmin](https://www.pgadmin.org/) to interact with the database manually. 

Please refer to the file ecommerce.sql in the repository.
