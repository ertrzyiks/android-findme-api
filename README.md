android-findme-api [![Build Status](https://travis-ci.org/ertrzyiks/android-findme-api.svg?branch=master)](https://travis-ci.org/ertrzyiks/android-findme-api)
==================

#Overview

FindMe API is service for sharing and tracking location between users. 
Actual application has own repository [here](https://github.com/ertrzyiks/android-findme-app).

Stage deployment is available under [https://agile-brushlands-2260.herokuapp.com](https://agile-brushlands-2260.herokuapp.com)

## Authentication

Service use OAuth2 standard with refresh token grant type.

Its very important to have very fast start, so there is no password protection. User create one-time account and keep 
context by using token exchange.

First, create account with just username:

    POST "/api/v1/users"
        {
            "username": "Jeremy"
        }

response contains access token and refresh token. When access token expire, use refresh token to get new set of tokens.

    POST "/oauth/v2/token"
        {
            "client_id": "{{ CLIENT_ID }}",
            "client_secret": "{{ CLIENT_SECRET }}",
            "grant_type": "refresh_token",
            "refresh_token": "{{ REFRESH_TOKEN }}"
        }
