export default function getEnv() {
  return {
    apiKey: '12345678',
    channel: process.env.channel as string,
    host: process.env.host as string,
    S3Bucket: process.env.S3Bucket as string,
    S3Filename: process.env.S3Filename as string,
    spaceId: process.env.spaceId as string,
    websiteBaseUrl: process.env.websiteBaseUrl as string,
  };
}
