import create, { PublishingStatus } from '@contentchef/contentchef-node';
import getEnv from '@app/Env';

const ContentChefClient = (env: ReturnType<typeof getEnv>, publishingStatus: PublishingStatus) => {
  return create({
    apiKey: env.apiKey,
    host: env.host,
    spaceId: env.spaceId,
  }).channel(env.channel, publishingStatus);
};

export default ContentChefClient;
