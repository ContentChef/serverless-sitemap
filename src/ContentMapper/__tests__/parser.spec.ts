import parser from '../parser';

describe(`parser`, () => {
  test(parser.formatDate.name, () => {
    expect(parser.formatDate('2000-01-01T00:00:00Z')).toBe('2000-01-01');
  });

  test(parser.getDate.name, () => {
    const contentLastModifiedDate = '1';
    const publishedOn = '2';
    const toItem = (metadata) => ({ metadata });
    
    expect(parser.getDate(toItem({ contentLastModifiedDate }) as any)).toBe(contentLastModifiedDate);
    expect(parser.getDate(toItem({ publishedOn }) as any)).toBe(publishedOn);
    expect(parser.getDate(toItem({ publishedOn, contentLastModifiedDate }) as any)).toBe(contentLastModifiedDate);
  });

  test(parser.isUrl.name, () => {
    expect(parser.isUrl(`foobar`)).toBeFalsy();
    expect(parser.isUrl(`/barchart`)).toBeTruthy();
  });

  test(parser.map.name, () => {
    const publicId = '/foo';
    const contentLastModifiedDate = new Date().toJSON();

    expect(parser.map({ publicId, metadata: { contentLastModifiedDate } } as any)).toEqual({
      date: contentLastModifiedDate.split('T')[0],
      url: publicId,
    });
  });
});
