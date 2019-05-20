import createGenerateSitemap from '.';
import { PublishingStatus } from "@contentchef/contentchef-node";

const handler = createGenerateSitemap(PublishingStatus.Staging);

export {
  handler,
};

export default handler;
