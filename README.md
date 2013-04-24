## Feed Masher


### Adding config/services.json

In order to get this to load, you need to add in a services.json file to the config directory in your project. This contains all of the authentication parameters that are needed in order to query live services.

#### Adding Twitter

```json
{
  "twitter": [{
    "screen_name": "nodrew",
    "credentials" : {
      "consumer_key":         "...",
      "consumer_secret":      "...",
      "access_token":         "...",
      "access_token_secret":  "..."
    }
  }]
}
```

You can have it query multiple twitter handles by wimple dumplicating the config, life so:

```json
{
  "twitter": [{
    "screen_name": "nodrew",
    "credentials" : {
      "consumer_key":         "...",
      "consumer_secret":      "...",
      "access_token":         "...",
      "access_token_secret":  "..."
    }
  },
  {
    "screen_name": "nodrew",
    "credentials" : {
      "consumer_key":         "...",
      "consumer_secret":      "...",
      "access_token":         "...",
      "access_token_secret":  "..."
    }
  }]
}
```
