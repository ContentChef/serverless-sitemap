@contentchef/serverless-sitemap
===============================

- [@contentchef/serverless-sitemap](#contentchefserverless-sitemap)
  - [Install](#install)
  - [λ Publishing on the stack](#%CE%BB-publishing-on-the-stack)
  - [λ Testing this lambda locally](#%CE%BB-testing-this-lambda-locally)

## Install

```shell
yarn
# or
npm i
```

## λ Publishing on the stack

Parameters for deployment

* **--channel** is the Content Chef's publishing channel you wish to map
* **--host** is the rest endpoint base url
* **--publishingStatus** is the content publishing status (choose `staging` or `live`)
* **--S3Filename** is the name used for your generated sitemap.
* **--spaceId** is the Content Chef's space id you wish to map
* **--websiteBaseUrl** is the website base url (e.g. https://my-website.com/)

```shell
sls deploy --channel web --host "apihost" --publishingStatus staging|live --spaceId defaultSpace --websiteBaseUrl "hostname" --S3Filename "test-sitemap.xml"
```

## λ Testing this lambda locally

* **channel** is the Content Chef's publishing channel you wish to map
* **host** is the rest endpoint base url
* **publishingStatus** is the content publishing status (choose `staging` or `live`)
* **S3Filename** is the name used for your generated sitemap.
* **spaceId** is the Content Chef's space id you wish to map
* **websiteBaseUrl** is the website base url (e.g. https://my-website.com/)

```shell
# copy this command

apiKey=qwe channel=web host="https://m1fca4b1p8.execute-api.eu-central-1.amazonaws.com/test/" publishingStatus=staging spaceId=defaultSpace websiteBaseUrl="https://customer.com/" sls invoke local --function generate-sitemap
```
