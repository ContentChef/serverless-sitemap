import generateSitemap from '..';
import createMockEnv from '@app/__mocks__/Env.mock';
import { PublishingStatus } from "@contentchef/contentchef-node";

beforeAll(() => {
  process.env = createMockEnv();
});

describe(generateSitemap.name, () => {
  it('should generate a sitemap', async () => {
    let error;
    let result;
    
    const callback = jest.fn((fnerror, fnresult) => {
      error = fnerror;
      result = fnresult;
    });

    await generateSitemap(PublishingStatus.Staging)({}, {}, callback);

    expect(callback).toBeCalled();
    expect(error).toBeNull();
    expect(result).toBeDefined();
    expect(typeof result).toBe('string');
  });
});
