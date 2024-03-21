# DGMarkt Coupon Code REST API

This is a simple REST API server built with Node.js and Express for writing coupon data to a DGMarkt MySQL database table. It provides a single endpoint to insert data into the database table.

## Dependencies
 - [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
 - [mysql2](https://github.com/sidorares/node-mysql2): MySQL client for Node.js with focus on performance.
 - [body-parser](https://github.com/expressjs/body-parser): Node.js body parsing middleware.

## Requirements

`npm install express body-parser mysql2`

## How to run

1. Provide credentials into dbConfig.js file (you can copy and rename example file `dbConfig_example.js`)
2. `node index.js`
3. The server will start running on http://localhost:3000 by default.


## Usage
### Endpoint

`POST http://hostname:3000/api/coupon/add`

### Request body

```json
{
    "name": "-10% Discount",
    "code": "SALE10",
    "discount": 10.0,
    "shipping": 0,
    "total": 0.0,
    "date_start": "2024-03-03",
    "date_end": "2024-04-04",
    "uses_total": 10
}
```

### Response

* `201 Created`: Data was written successfully.
    ```json
    {
        "message": "Data written successfully"
    }
    ```
* `500 Internal Server Error`: An error occurred while processing the request.
    ```json
    {
        "message": "Internal server error",
        "description": "Incorrect decimal value: '10' for column 'total' at row 1"
    }
    ```