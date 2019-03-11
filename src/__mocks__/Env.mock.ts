import getEnv from '@app/Env';

export default function createMockEnv() {
  const env = getEnv();

  env.S3Bucket = 'contentchef-sitemap-dev-contentchefsitemap-1d1pqywi2zqd3';
  env.S3Filename = 'lorem-ipsum.xml'
  env.apiKey = 'qwe';
  env.channel = 'web';
  env.host = 'https://m1fca4b1p8.execute-api.eu-central-1.amazonaws.com/test/';
  env.publishingStatus = 'staging';
  env.spaceId = 'defaultSpace';
  env.websiteBaseUrl = 'https://customer.com/';
  
  return env;
}