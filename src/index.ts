import XML from '@app/XML';
import * as searchIndexableContent from '@app/searchIndexableContent';
import getEnv from './Env';
import sdk from 'aws-sdk';
import Logger from './Logger';
import { PublishingStatus } from "@contentchef/contentchef-node";

export default function createGenerateSitemap(publishingStatus: PublishingStatus) {
  return async (event: any, context: any, callback: any) => {
    try {
      const env = getEnv();

      Logger.info(event);

      Logger.info('Env configuration below');
      Logger.info(`${env}`);

      const content = await searchIndexableContent.searchIndexableContent(env, publishingStatus);
      const unique = XML.discardDuplicates(
          content,
              i => !searchIndexableContent.filterRobotNoIndex(i)
      );

      Logger.info(`Processing ${unique.length} results`);

      const xml = XML.createSitemap(env.websiteBaseUrl, unique);
      const s3 = new sdk.S3({
        apiVersion: '2006-03-01',
      });

      const result = await s3.upload({
        Body: xml,
        Bucket: env.S3Bucket,
        ContentEncoding: 'UTF-8',
        ContentType: 'application/xml',
        Key: `${publishingStatus}-${env.S3Filename}`,
      }).promise();

      Logger.info(`
      Uploaded XML:
        ${ result.Location}
    `);

      callback(null, result.Location);

    } catch (error) {
      Logger.error(error);
      callback(error);
    }
  }
}
