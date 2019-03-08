import xmlbuilder from 'xmlbuilder';
import url from 'url';

export interface IXMLSitemapItem {
  date: string;
  url: string;
}

export function createSitemap(baseurl: string, items: IXMLSitemapItem[]) {
  const root = xmlbuilder.create('urlset', {
    encoding: 'UTF-8',
    version: '1.0',
  });

  root.attribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
  
  items.forEach(item => {
    root.element('url', {})
      .element('loc', {}, url.resolve(baseurl, item.url))
      .up()
      .element('lastmod', {}, item.date);
  });

  return root.end();
}

export default {
  createSitemap,
}
