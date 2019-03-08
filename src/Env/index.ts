export default function getEnv() {
  return {
    apiKey: process.env.apiKey as string,
    channel: process.env.channel as string,
    host: process.env.host as string,
    publishingStatus: process.env.publishingStatus as any,
    spaceId: process.env.spaceId as string,
    websiteBaseUrl: process.env.websiteBaseUrl as string,
  };
}
