import xml from '../index';

const mock = 
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"> 
  <url>
    <loc>http://www.example.com/foo.html</loc>
  </url>
  <url>
    <loc>http://www.example.com/bar.html</loc>
  </url>
  <url>
    <loc>http://www.example.com/baz.html</loc>
  </url>
</urlset>`;

const trim = (str: string) => str.replace(/>\s+|\s+</g, m => m.trim());

describe('XML', () => {
  test('create an XML sitemap from a dataset', () => {
    const result = xml.createSitemap('http://www.example.com', [
      {
        date: '2018-06-04',
        url: 'foo.html',
      },
      {
        date: '2018-06-03',
        url: 'bar.html',
      },
      {
        date: '2018-06-02',
        url: 'baz.html',
      },
    ]);

    expect(trim(result)).toMatch(trim(mock));
  });
});
