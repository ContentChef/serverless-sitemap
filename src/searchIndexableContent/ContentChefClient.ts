import create from '@contentchef/contentchef-node';
import getEnv from '@app/Env';

const ContentChefClient = (env: ReturnType<typeof getEnv>) => {
  return create({
    apiKey: env.apiKey,
    host: env.host,
    spaceId: env.spaceId,
  }).channel(env.channel, env.publishingStatus);
};

export default ContentChefClient;
