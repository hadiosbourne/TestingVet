# News Service
This service will be used to publish and retrieve News headlines

## Security
This service uses JWT security tokens, Use the website https://jwt.io/ to decode or generate a token. The secret you need to use will be defined as `api_token` in config file(This will differ depending on the environment)

News expects to receive the generated JWT token from Client (Through whatever authentication service they use) which should use the same api_key as we have in our config to encrypt the token.

example of a JWT payload:

```json
{
  "iss": "news",
  "sub": "5799b72e8aaf4a18b74c06a6",
  "role": "editor"
}
```

Only required filed on the paylod is the `role`, and valid values are: `admin`, `editor`, `reader`
JWT examples to be used for testing for each role:

`admin`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImFkbWluIn0.BjECD9BwLzSRJblOt1Plp66uywGXOA9Sqef0DYT3y50`
`editor`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImVkaXRvciJ9.4aAvEm3UAcOGzNAVo1T_8L0tLg0MucpVwT1asgT9_kg`
`reader`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6InJlYWRlciJ9.WfTrq57uGJnZT870RRAgSZ68GKfdgR1eEfiAmBRuZ1s`

Once our `JWTSecurityHelper` receives the JWT token, it uses the api_key defined in the config to decrypt the token and looks for the `role` property on it, and it will look through the `PermissionRoles` collection to find the list of accesses, and based on that each route will allow the user to use that specific route.


## Future Improvments

#### Authorization
Currently rely on UI to send us the authorization token and we doing a simple authorization implementation, we need to use an authorization service with Oauth2 standard to save the user details and based on the role of the user to generate a jwt token to the service, this service should be able to create token and refresh token for longer authorizations

#### Using messaging service
In the current implementation consumer uses REST calls to access the news, A better way of implementing this would be to make use of messaging service (Publisher/Subscriber) where we can have the `consumers` to `Subscribe` to certain topics that they are interested in, and
when the publisher POSTs a news, it will publishe a message to the relevant topic, and all the subscriber to that topic will recieve the record automatically.

#### CI Setup
We only have an empty CI file which needs to be replaced with correct config depending on the CI service we use

#### Docker and Compose
Currently we only have templates in place, which need to be repalced with real settings

#### Error handling
We are not doing any error handling for this implementation, we can create error handling helper middlewares to handle the error in any format that we need and will usually contain some sort of an error code and message.

#### Complex query handling and pagination
At the moment we only have simple, straight query handlings, we can add pagination support, sorting and advanced search funtionality for aggregation queries, If we want something that can be used by other microservices, we can implement an advanced search service or library.

#### Add indexing to the collection
Indexing can be utilised for faster access, incase we gonna have loads of records

#### Api_Token
In current implementation we only have a default key for testing, in real world, we need to have env specific tokens in our vault.

#### Test cases
Test cases can improve, we only added one for success cases.