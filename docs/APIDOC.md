# Wallet Service Api v1

A standalong virtual wallet service that can be used in any project. Here is the public HTTP api documentation for creating, crediting, debiting, managing virtual wallets.

# Wallets [/wallets]

## Create New Wallet [POST]

Creates new wallet object with zero balance called everytime.

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}

* Response 201 (application/json; charset=utf-8)

  - Headers

          Server:Cowboy
          Connection:keep-alive
          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:252
          Etag:W/"fc-LquUUd7dp4/7tRbXB/5D5kBitcU"
          Date:Mon, 02 Mar 2020 15:20:40 GMT
          Via:1.1 vegur

  - Attributes (Successful wallet creation)


    + Body

            {
              "success": true,
              "type": "CREATED",
              "message": "Wallet created successfully.",
              "data": {
                "amount": 0,
                "hold_amount": 0,
                "used_amount": 0,
                "guid": "5e7cf3b6-2f0d-47d2-864e-5df0f7bd6106",
                "created_at": "2020-03-02T15:20:40Z",
                "updated_at": "2020-03-02T15:20:40Z"
              }
            }

# Wallets [/wallets{?skip,take}]

## Wallets [GET]

Retrieve all wallets. You can use skip and take for chunking response.

- Parameters

  - skip (number, required)

    Optional. Skips no of records.

    - Sample: 0

  - take (number, required)

    Optional. Takes no. of records.

    - Sample: 10

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}

* Response 200 (application/json; charset=utf-8)

  - Headers

          Server:Cowboy
          Connection:keep-alive
          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:1279
          Etag:W/"4ff-lY7mibRRhYhsbIGgdRIafuVN118"
          Date:Mon, 02 Mar 2020 15:25:03 GMT
          Via:1.1 vegur

  - Attributes (Get wallets)


    + Body

            {
              "success": true,
              "type": "OK",
              "message": "Wallets fetched successfully",
              "data": [
                {
                  "guid": "5e7cf3b6-2f0d-47d2-864e-5df0f7bd6106",
                  "amount": 0,
                  "hold_amount": 0,
                  "used_amount": 0,
                  "created_at": "2020-03-02T15:20:40Z",
                  "updated_at": "2020-03-02T15:20:40Z"
                },
                {
                  "guid": "a896d7f4-47b6-435a-a325-bcaf2eedcea8",
                  "amount": 0,
                  "hold_amount": 0,
                  "used_amount": 0,
                  "created_at": "2020-03-01T13:02:00Z",
                  "updated_at": "2020-03-01T13:02:00Z"
                },
                {
                  "guid": "7f418de6-af2c-4562-9d27-7d44bc9763fa",
                  "amount": 0,
                  "hold_amount": 0,
                  "used_amount": 0,
                  "created_at": "2020-03-01T13:01:59Z",
                  "updated_at": "2020-03-01T13:01:59Z"
                },
                {
                  "guid": "4a4471eb-783e-4853-a6cd-fa23146371ad",
                  "amount": 0,
                  "hold_amount": 0,
                  "used_amount": 0,
                  "created_at": "2020-03-01T13:01:58Z",
                  "updated_at": "2020-03-01T13:01:58Z"
                },
                {
                  "guid": "e1e6c3f9-2c8a-42d2-9cc5-a18f96cdce67",
                  "amount": 0,
                  "hold_amount": 0,
                  "used_amount": 0,
                  "created_at": "2020-03-01T13:01:58Z",
                  "updated_at": "2020-03-01T13:01:58Z"
                },
                {
                  "guid": "d9ff6915-a62d-4981-821d-6e17de3a77f0",
                  "amount": 0,
                  "hold_amount": 0,
                  "used_amount": 0,
                  "created_at": "2020-03-01T13:01:56Z",
                  "updated_at": "2020-03-01T13:01:56Z"
                },
                {
                  "guid": "9c97d063-2387-4a14-bcc5-13303909b7a7",
                  "amount": 248,
                  "hold_amount": -98,
                  "used_amount": 0,
                  "created_at": "2020-02-22T19:15:03Z",
                  "updated_at": "2020-03-01T14:08:00Z"
                }
              ]
            }

# Wallets By Id [/wallets/{id}]

- Parameters

  - id (string, required)

    Wallet guid

    - Sample: 9c97d063-2387-4a14-bcc5-13303909b7a7

## Wallet [GET]

Get single wallet by guid.

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}

* Response 200 (application/json; charset=utf-8)

  - Headers

          Server:Cowboy
          Connection:keep-alive
          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:250
          Etag:W/"fa-WjVkRP0r9Exe/jDpzn5ok9wnE8M"
          Date:Mon, 02 Mar 2020 15:44:49 GMT
          Via:1.1 vegur

  - Attributes (Single wallet success)


    + Body

            {
              "success": true,
              "type": "OK",
              "message": "Wallet fetched successfully",
              "data": {
                "guid": "9c97d063-2387-4a14-bcc5-13303909b7a7",
                "amount": 248,
                "hold_amount": -98,
                "used_amount": 0,
                "created_at": "2020-02-22T19:15:03Z",
                "updated_at": "2020-03-01T14:08:00Z"
              }
            }

- Response 404 (application/json)

        Not Found

  - Attributes (Delete Wallet Success)


    + Body

            {
              "success": false,
              "type": "NOT_FOUND",
              "message": "Wallet not found"
            }

## Wallet [DELETE]

Delete wallet by id. :id stands for wallet object key 'guid'. On delete a wallet, all transactions related to the wallet will be removed too.

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}

* Response 200 (application/json; charset=utf-8)

  - Headers

          Server:Cowboy
          Connection:keep-alive
          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:69
          Etag:W/"45-hgtSSN2r3g0PSReKNgZChp/BQiQ"
          Date:Mon, 02 Mar 2020 15:30:43 GMT
          Via:1.1 vegur

  - Attributes (Delete Wallet Success)


    + Body

            {
              "success": true,
              "type": "OK",
              "message": "Wallet deleted successfully."
            }

- Response 404 (application/json)

        Not Found

  - Attributes (Delete Wallet Success)


    + Body

            {
              "success": false,
              "type": "NOT_FOUND",
              "message": "Wallet not found"
            }

# Wallets Credit By Id [/wallets/{id}/credit]

- Parameters

  - id (string, required)

    Wallet object guid

    - Sample: a896d7f4-47b6-435a-a325-bcaf2eedcea8

## Credit wallet [POST]

Credit wallet with amount. Reference id must be unique and should be stored in your end. Amount cannot be less than 0.01.

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}


    + Attributes (Credit wallet Request)


    + Body

            {
                "reference_id": "ref_1234",
                "amount": 100.0,
                "description": "Add Rs. 100 to wallet from admin."
            }

- Response 200 (application/json; charset=utf-8)

  - Headers

          Server:Cowboy
          Connection:keep-alive
          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:586
          Etag:W/"24a-2OyB7lEviwAzR5oNaVcvWG7kqtE"
          Date:Mon, 02 Mar 2020 18:12:27 GMT
          Via:1.1 vegur

  - Attributes (Credit wallet Success)


    + Body

            {
              "success": true,
              "type": "CREDITED",
              "message": "Wallet credited successfully",
              "data": {
                "updatedWallet": {
                  "amount": 100,
                  "updated_at": "2020-03-02T18:12:26Z",
                  "guid": "a896d7f4-47b6-435a-a325-bcaf2eedcea8",
                  "hold_amount": 0,
                  "used_amount": 0,
                  "created_at": "2020-03-01T13:02:00Z"
                },
                "transaction": {
                  "reference_id": "ref_1234",
                  "pre_amount": 0,
                  "amount": 100,
                  "post_amount": 100,
                  "status": "completed",
                  "description": "Add Rs. 100 to wallet from admin.",
                  "transaction_id": "43b40c4c-dc07-4fdb-b5a2-cffc8a03a1bb",
                  "expires_at": null,
                  "created_at": "2020-03-02T18:12:26Z",
                  "updated_at": "2020-03-02T18:12:26Z"
                }
              }
            }

- Response 400 (application/json)

        Bad Request

  - Attributes (Delete Wallet Success)


    + Body

            {
              "success": false,
              "type": "BAD_REQUEST",
              "message": "Bad requeest or duplicate reference_id"
            }

# Wallets Debit Init By Id [/wallets/{id}/debit/init]

- Parameters

  - id (string, required)

    - Sample: a896d7f4-47b6-435a-a325-bcaf2eedcea8

## Debit Wallet Step 1 [POST]

Debiting amount from wallet has 2 steps.
Step 1 : Initiate the debit with amount. In this stage amount will be kept on hold upto a given time called expires_at. Status will be 'on_hold'.
Step 2 : Final complete the debit process. Status will be 'completed'

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}


    + Attributes (Debit Wallet  Step  1 Request)


    + Body

            {
                "reference_id": "ref_1235",
                "amount": 10.0,
                "expires_at": "2020-01-28 20:46:07",
                "description": "Payment for purchase product id prod_12xu32"
            }

- Response 200 (application/json; charset=utf-8)

  - Headers

          Server:Cowboy
          Connection:keep-alive
          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:620
          Etag:W/"26c-IBTo6aFseU/2sQ3s0bHGTrCXrCg"
          Date:Mon, 02 Mar 2020 18:23:44 GMT
          Via:1.1 vegur

  - Attributes (Debit init success)


    + Body

            {
              "success": true,
              "type": "INITIATED",
              "message": "Request initiated successfully",
              "data": {
                "updatedWallet": {
                  "amount": 90,
                  "hold_amount": 10,
                  "updated_at": "2020-03-02T18:23:43Z",
                  "guid": "a896d7f4-47b6-435a-a325-bcaf2eedcea8",
                  "used_amount": 0,
                  "created_at": "2020-03-01T13:02:00Z"
                },
                "transaction": {
                  "reference_id": "ref_1235",
                  "pre_amount": 100,
                  "amount": -10,
                  "post_amount": 90,
                  "status": "on_hold",
                  "expires_at": "2020-03-28T20:46:07Z",
                  "description": "Payment for purchase product id prod_12xu32",
                  "transaction_id": "b254c799-2141-4067-97da-19483a1b3b5d",
                  "created_at": "2020-03-02T18:23:43Z",
                  "updated_at": "2020-03-02T18:23:43Z"
                }
              }
            }

- Response 400 (application/json)

        Bad Request

  - Attributes (Delete Wallet Success)


    + Body

            {
              "success": false,
              "type": "BAD_REQUEST",
              "message": "Must be same or greater than current time."
            }

# Wallets Transactions By Id And Txnid [/wallets/{id}/transactions/{txnid}]

- Parameters

  - id (string, required)

    Wallet guid

    - Sample: a896d7f4-47b6-435a-a325-bcaf2eedcea8

  - txnid (string, required)

    Transaction id received from debit wallet step 1

    - Sample: b254c799-2141-4067-97da-19483a1b3b5d

## Update On Hold Transaction [PATCH]

On hold transaction created by debit api can be updated. Only few keys can be modified only for now ex: reference_id, description, expires_at.

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}


    + Attributes (Update On Hold Transaction Request)


    + Body

            {
                "reference_id": "ref_12342_updated",
                "description": "Payment for purchase product id prod_12xu32 updated",
                "expires_at": "2020-03-25 15:15:02"
            }

- Response 200 (application/json; charset=utf-8)

  - Headers

          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:427
          ETag:W/"1ab-Fd+8XvL9fzAHRts0K/k+XmOpLPc"
          Date:Mon, 02 Mar 2020 18:35:03 GMT
          Connection:keep-alive

  - Attributes (Updated success response)


    + Body

            {
              "success": true,
              "type": "OK",
              "message": "Transaction updated successfully",
              "data": {
                "reference_id": "ref_12342_updated",
                "description": "Payment for purchase product id prod_12xu32 updated",
                "expires_at": "2020-03-25T09:45:02Z",
                "updated_at": "2020-03-02T13:05:03Z",
                "transaction_id": "b254c799-2141-4067-97da-19483a1b3b5d",
                "pre_amount": 100,
                "amount": -10,
                "post_amount": 90,
                "status": "on_hold",
                "created_at": "2020-03-02T12:53:43Z"
              }
            }

## Transaction [GET]

Get single transaction by wallet guid and transciton id

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}

* Response 200 (application/json; charset=utf-8)

  - Headers

          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:407
          ETag:W/"197-FOjta0kw9Kx4MsuiSu92WFSTMZE"
          Date:Mon, 02 Mar 2020 18:47:18 GMT
          Connection:keep-alive

  - Attributes (Transaction success)


    + Body

            {
              "success": true,
              "type": "OK",
              "message": "Transaction fetched successfully",
              "data": {
                "transaction_id": "b254c799-2141-4067-97da-19483a1b3b5d",
                "reference_id": "ref_12342_updated",
                "pre_amount": 100,
                "amount": -10,
                "post_amount": 90,
                "expires_at": null,
                "status": "completed",
                "description": "Payment for purchase product id prod_12xu32 updated",
                "created_at": "2020-03-02T12:53:43Z",
                "updated_at": "2020-03-02T13:08:39Z"
              }
            }

# Wallets Transactions Complete By Id [/wallets/{id}/transactions/{txnid}/complete]

- Parameters

  - id (string, required)

    Wallet guid

    - Sample: a896d7f4-47b6-435a-a325-bcaf2eedcea8

  - txnid (string, required)

    Transaction id

    - Sample: b254c799-2141-4067-97da-19483a1b3b5d

## Debit wallet Step 2 [PATCH]

This is final step to complete debit amount from wallet. Hereafter, transaction status will be completed.

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}

* Response 200 (application/json; charset=utf-8)

  - Headers

          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:628
          ETag:W/"274-SVuLfGX1IbvzKRhuX51FEE31to0"
          Date:Mon, 02 Mar 2020 18:38:39 GMT
          Connection:keep-alive

  - Attributes (Debit wallet Step 2 Completed)


    + Body

            {
              "success": true,
              "type": "COMPLETED",
              "message": "Transaction completed successfully.",
              "data": {
                "updatedWallet": {
                  "hold_amount": 0,
                  "updated_at": "2020-03-02T13:08:39Z",
                  "guid": "a896d7f4-47b6-435a-a325-bcaf2eedcea8",
                  "amount": 90,
                  "used_amount": 0,
                  "created_at": "2020-03-01T07:32:00Z"
                },
                "updatedTransaction": {
                  "status": "completed",
                  "expires_at": null,
                  "updated_at": "2020-03-02T13:08:39Z",
                  "transaction_id": "b254c799-2141-4067-97da-19483a1b3b5d",
                  "reference_id": "ref_12342_updated",
                  "pre_amount": 100,
                  "amount": -10,
                  "post_amount": 90,
                  "description": "Payment for purchase product id prod_12xu32 updated",
                  "created_at": "2020-03-02T12:53:43Z"
                }
              }
            }

# Wallets Transactions Release By Id [/wallets/{id}/transactions/{txnid}/release]

- Parameters

  - id (string, required)

    Wallet guid

    - Sample: a896d7f4-47b6-435a-a325-bcaf2eedcea8

  - txnid (string, required)

    Transaction id

    - Sample: 200c6689-abd7-47ca-80dc-09e74fe6cb55

## On hold transaction [DELETE]

Delete transaction which status is 'on_hold'. Expired on hold transactions will be release back to wallet automatically after expires_at time over.

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}

* Response 200 (application/json; charset=utf-8)

  - Headers

          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:278
          ETag:W/"116-RJ7Q9aHY9WxlowrwrlodxQrqMJM"
          Date:Mon, 02 Mar 2020 18:45:05 GMT
          Connection:keep-alive

  - Attributes (On hold transaction Success)


    + Body

            {
              "success": true,
              "type": "RELEASED",
              "message": "Transaction released successfully.",
              "data": {
                "updatedWallet": {
                  "amount": 90,
                  "hold_amount": 0,
                  "updated_at": "2020-03-02T13:15:05Z",
                  "guid": "a896d7f4-47b6-435a-a325-bcaf2eedcea8",
                  "used_amount": 0,
                  "created_at": "2020-03-01T07:32:00Z"
                }
              }
            }

# Wallets Transactions By Id [/wallets/{id}/transactions{?skip,take}]

- Parameters

  - id (string, required)

    - Sample: a896d7f4-47b6-435a-a325-bcaf2eedcea8

## Transactions [GET]

Get all transactiond by walle guid. You can use skip and take for chunking response.

- Parameters

  - skip (number, required)

    - Sample: 0

  - take (number, required)

    - Sample: 10

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}

* Response 200 (application/json; charset=utf-8)

  - Headers

          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:709
          ETag:W/"2c5-mNV8hcHoNWdWdQyraqgqglp17WY"
          Date:Mon, 02 Mar 2020 18:46:20 GMT
          Connection:keep-alive

  - Attributes (Get transactions Success)


    + Body

            {
              "success": true,
              "type": "OK",
              "message": "Transactions fetched successfully",
              "data": [
                {
                  "transaction_id": "b254c799-2141-4067-97da-19483a1b3b5d",
                  "reference_id": "ref_12342_updated",
                  "pre_amount": 100,
                  "amount": -10,
                  "post_amount": 90,
                  "expires_at": null,
                  "status": "completed",
                  "description": "Payment for purchase product id prod_12xu32 updated",
                  "created_at": "2020-03-02T12:53:43Z",
                  "updated_at": "2020-03-02T13:08:39Z"
                },
                {
                  "transaction_id": "43b40c4c-dc07-4fdb-b5a2-cffc8a03a1bb",
                  "reference_id": "ref_1234",
                  "pre_amount": 0,
                  "amount": 100,
                  "post_amount": 100,
                  "expires_at": null,
                  "status": "completed",
                  "description": "Add Rs. 100 to wallet from admin.",
                  "created_at": "2020-03-02T12:42:26Z",
                  "updated_at": "2020-03-02T12:42:26Z"
                }
              ]
            }

# Wallets Transactions Search [/wallets/transactions/search{?reference_id,transaction_id,status,wallet_id,skip,take}]

## Search transactions [GET]

Search transaction by the below optional fields.

- Parameters

  - reference_id (string, required)

    Optional

    - Sample: ref_1234

  - transaction_id (string, required)

    Optional

    - Sample: 6a0ad59d-dd04-4876-94a0-2e1fc5c60a82

  - status (string, required)

    Optional

    - Sample: on_hold

  - wallet_id (string, required)

    Optional

    - Sample: 9c97d063-2387-4a14-bcc5-13303909b7a7

  - skip (number, required)

    Optional

    - Sample: 0

  - take (number, required)

    Optional

    - Sample: 10

- Request (application/json)

  - Headers

          Authorization:{{auth_key}}

* Response 200 (application/json; charset=utf-8)

  - Headers

          X-Powered-By:Express
          Access-Control-Allow-Origin:*
          Access-Control-Allow-Credentials:true
          Access-Control-Allow-Methods:GET,HEAD,OPTIONS,POST,PUT
          Access-Control-Allow-Headers:Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers
          Content-Length:2582
          ETag:W/"a16-e+sbjFClcaqpaIOB3X+qR709T2k"
          Date:Mon, 02 Mar 2020 18:50:39 GMT
          Connection:keep-alive

  - Attributes (Search transactions)


    + Body

            {
              "success": true,
              "type": "OK",
              "message": "Transactions fetched successfully",
              "data": [
                {
                  "transaction_id": "b254c799-2141-4067-97da-19483a1b3b5d",
                  "wallet_id": 6,
                  "reference_id": "ref_12342_updated",
                  "pre_amount": 100,
                  "amount": -10,
                  "post_amount": 90,
                  "expires_at": null,
                  "status": "completed",
                  "description": "Payment for purchase product id prod_12xu32 updated",
                  "created_at": "2020-03-02T12:53:43Z",
                  "updated_at": "2020-03-02T13:08:39Z",
                  "wallet": {
                    "guid": "a896d7f4-47b6-435a-a325-bcaf2eedcea8",
                    "amount": 90,
                    "hold_amount": 0,
                    "used_amount": 0,
                    "created_at": "2020-03-01T07:32:00Z",
                    "updated_at": "2020-03-02T13:15:05Z"
                  }
                },
                {
                  "transaction_id": "43b40c4c-dc07-4fdb-b5a2-cffc8a03a1bb",
                  "wallet_id": 6,
                  "reference_id": "ref_1234",
                  "pre_amount": 0,
                  "amount": 100,
                  "post_amount": 100,
                  "expires_at": null,
                  "status": "completed",
                  "description": "Add Rs. 100 to wallet from admin.",
                  "created_at": "2020-03-02T12:42:26Z",
                  "updated_at": "2020-03-02T12:42:26Z",
                  "wallet": {
                    "guid": "a896d7f4-47b6-435a-a325-bcaf2eedcea8",
                    "amount": 90,
                    "hold_amount": 0,
                    "used_amount": 0,
                    "created_at": "2020-03-01T07:32:00Z",
                    "updated_at": "2020-03-02T13:15:05Z"
                  }
                },
                {
                  "transaction_id": "7cd45a6f-53aa-4229-95dd-e66b29faf421",
                  "wallet_id": 1,
                  "reference_id": "asdfaexse",
                  "pre_amount": 300,
                  "amount": -50,
                  "post_amount": 250,
                  "expires_at": null,
                  "status": "completed",
                  "description": "First payment",
                  "created_at": "2020-02-23T13:21:37Z",
                  "updated_at": "2020-02-23T13:25:00Z",
                  "wallet": {
                    "guid": "9c97d063-2387-4a14-bcc5-13303909b7a7",
                    "amount": 248,
                    "hold_amount": -98,
                    "used_amount": 0,
                    "created_at": "2020-02-22T13:45:03Z",
                    "updated_at": "2020-03-01T08:38:00Z"
                  }
                },
                {
                  "transaction_id": "f0a0a604-d4d8-474c-a1ab-2e8e03c225b2",
                  "wallet_id": 1,
                  "reference_id": "adfasefsdafdasdd",
                  "pre_amount": 200,
                  "amount": 100,
                  "post_amount": 300,
                  "expires_at": null,
                  "status": "completed",
                  "description": "Add 100 to wallet first time",
                  "created_at": "2020-02-23T13:10:07Z",
                  "updated_at": "2020-02-23T13:10:07Z",
                  "wallet": {
                    "guid": "9c97d063-2387-4a14-bcc5-13303909b7a7",
                    "amount": 248,
                    "hold_amount": -98,
                    "used_amount": 0,
                    "created_at": "2020-02-22T13:45:03Z",
                    "updated_at": "2020-03-01T08:38:00Z"
                  }
                },
                {
                  "transaction_id": "4705a250-caf5-4516-8260-d4490b7967a6",
                  "wallet_id": 1,
                  "reference_id": "adfasefsafdasdd",
                  "pre_amount": 100,
                  "amount": 100,
                  "post_amount": 200,
                  "expires_at": null,
                  "status": "completed",
                  "description": "Add 100 to wallet first time",
                  "created_at": "2020-02-23T13:10:04Z",
                  "updated_at": "2020-02-23T13:10:04Z",
                  "wallet": {
                    "guid": "9c97d063-2387-4a14-bcc5-13303909b7a7",
                    "amount": 248,
                    "hold_amount": -98,
                    "used_amount": 0,
                    "created_at": "2020-02-22T13:45:03Z",
                    "updated_at": "2020-03-01T08:38:00Z"
                  }
                }
              ]
            }
