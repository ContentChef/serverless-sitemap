import createGenerateSitemap from '.';
import { PublishingStatus } from "@contentchef/contentchef-node";

const handler = createGenerateSitemap(PublishingStatus.Live);

export {
  handler,
};

export default handler;
