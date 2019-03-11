import * as searchIndexableContent from '..';

describe(`searchIndexableContent`, () => {
  test(searchIndexableContent.formatDate.name, () => {
    expect(searchIndexableContent.formatDate('2000-01-01T00:00:00Z')).toBe('2000-01-01');
  });

  test(searchIndexableContent.getDate.name, () => {
    const contentLastModifiedDate = '1';
    const publishedOn = '2';
    const toItem = (metadata) => ({ metadata });
    
    expect(searchIndexableContent.getDate(toItem({ contentLastModifiedDate }) as any)).toBe(contentLastModifiedDate);
    expect(searchIndexableContent.getDate(toItem({ publishedOn }) as any)).toBe(publishedOn);
    expect(searchIndexableContent.getDate(toItem({ publishedOn, contentLastModifiedDate }) as any)).toBe(contentLastModifiedDate);
  });

  test(searchIndexableContent.isUrl.name, () => {
    expect(searchIndexableContent.isUrl(`foobar`)).toBeFalsy();
    expect(searchIndexableContent.isUrl(`/barchart`)).toBeTruthy();
  });

  test(searchIndexableContent.map.name, () => {
    const publicId = '/foo';
    const contentLastModifiedDate = new Date().toJSON();

    expect(searchIndexableContent.map({ publicId, metadata: { contentLastModifiedDate } } as any)).toEqual({
      date: contentLastModifiedDate.split('T')[0],
      url: publicId,
    });
  });
});
