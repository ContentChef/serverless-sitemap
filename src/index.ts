import XML from '@app/XML';
import ContentMapper from '@app/ContentMapper';
import ContentChefClient from '@app/ContentMapper/ContentChefClient';
import getEnv from './Env';
// import sdk from 'aws-sdk';

export default async function generateSitemap(event, context, callback) {
  try {
    const client = ContentChefClient()
    const env = getEnv();
    const content = await ContentMapper(client);
    const xml = XML.createSitemap(env.websiteBaseUrl, content);
    // const s3 = new sdk.S3();

    callback(null, xml);
  } catch(error) {
    callback(error);
  }
}
