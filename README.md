@contentchef/serverless-sitemap
===============================

- [@contentchef/serverless-sitemap](#contentchefserverless-sitemap)
  - [Install](#install)
  - [Publishing on the stack](#publishing-on-the-stack)
  - [Testing this lambda locally](#testing-this-lambda-locally)

## Install

```shell
yarn
# or
npm i
```

## Publishing on the stack

```shell
sls deploy --channel web --host "apihost" --publishingStatus staging|live --spaceId defaultSpace --websiteBaseUrl "hostname" --S3Filename "test-sitemap.xml"
```

## Testing this lambda locally

```shell
# copy this command

apiKey=qwe channel=web host="https://m1fca4b1p8.execute-api.eu-central-1.amazonaws.com/test/" publishingStatus=staging spaceId=defaultSpace websiteBaseUrl="https://customer.com/" sls invoke local --function generate-sitemap
```