@contentchef/serverless-sitemap
===============================

## Install

```shell
yarn
# or
npm i
```

## Testing this lambda locally

```shell
# copy this command

apiKey=qwe channel=web host="https://m1fca4b1p8.execute-api.eu-central-1.amazonaws.com/test/" publishingStatus=staging spaceId=defaultSpace websiteBaseUrl="https://customer.com/" sls invoke local --function generate-sitemap
```