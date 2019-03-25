import createGenerateSitemap from '.';

const handler = createGenerateSitemap('staging', '-staging');

export {
  handler,
};

export default handler;
