import * as searchIndexableContent from '..';

describe(`searchIndexableContent`, () => {  
  test(searchIndexableContent.filterRobotNoIndex.name, () => {
    expect(searchIndexableContent.filterRobotNoIndex({})).toBeTruthy();
    expect(searchIndexableContent.filterRobotNoIndex(123)).toBeTruthy();
    expect(searchIndexableContent.filterRobotNoIndex({ seo: 123 })).toBeTruthy();
    expect(searchIndexableContent.filterRobotNoIndex({ seo: { robots: '' } })).toBeTruthy();
    expect(searchIndexableContent.filterRobotNoIndex({ seo: { robots: 'hello-world' } })).toBeTruthy();
    expect(searchIndexableContent.filterRobotNoIndex({ seo: { robots: 'hello-world, follow' } })).toBeTruthy();
    expect(searchIndexableContent.filterRobotNoIndex({ seo: { robots: 'noindex, follow' } })).toBeFalsy();
  });

  test(searchIndexableContent.getDate.name, () => {
    const contentLastModifiedDate = '1';
    const publishedOn = '2';
    const toItem = (metadata) => ({ metadata });
    
    expect(searchIndexableContent.getDate(toItem({ contentLastModifiedDate }) as any)).toBe(contentLastModifiedDate);
    expect(searchIndexableContent.getDate(toItem({ publishedOn }) as any)).toBe(publishedOn);
    expect(searchIndexableContent.getDate(toItem({ publishedOn, contentLastModifiedDate }) as any)).toBe(contentLastModifiedDate);
  });

  test(searchIndexableContent.getLinkedContent.name, () => {
    expect(searchIndexableContent.getLinkedContent({ payload: { linkedContents: [1] } } as any)).toEqual([1]);
  });

  test(searchIndexableContent.getURL.name, () => {
    const url = 'foobar';
    expect(searchIndexableContent.getURL({ payload: { url }} as any)).toEqual(url);
  });

  test(searchIndexableContent.hasLinkedContent.name, () => {
    expect(searchIndexableContent.hasLinkedContent({ payload: { linkedContents: [1] } } as any)).toBeTruthy();
    expect(searchIndexableContent.hasLinkedContent({ } as any)).toBeFalsy();
  });

  test(searchIndexableContent.hasPayload.name, () => {
    expect(searchIndexableContent.hasPayload({ payload: 123 } as any)).toBeTruthy();
    expect(searchIndexableContent.hasPayload({} as any)).toBeFalsy();
  });

  test(searchIndexableContent.isUrl.name, () => {
    expect(searchIndexableContent.isUrl(`foobar`)).toBeFalsy();
    expect(searchIndexableContent.isUrl(`/barchart`)).toBeTruthy();
  });

  test(searchIndexableContent.map.name, () => {
    const publicId = '/foo';
    const url = '/bar';
    const contentLastModifiedDate = new Date().toJSON();

    expect(searchIndexableContent.map({ publicId, payload: { url, }, metadata: { contentLastModifiedDate } } as any)).toEqual({
      date: contentLastModifiedDate,
      url,
    });
  });
});
