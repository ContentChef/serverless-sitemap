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
  
  items.forEach(decorateSitemapNode(baseurl, root));

  return root.end({
    pretty: true,
  });
}

export function decorateSitemapNode(baseurl: string, root: xmlbuilder.XMLElementOrXMLNode) {
  return (item: IXMLSitemapItem) => {
    root.element('url', {})
      .element('loc', {}, getSitemapItemURL(baseurl, item))
      .up();
      // .element('lastmod', {}, item.date);
  }
}

export function discardDuplicates(items: IXMLSitemapItem[], discardInvalidNodesCallback: (item: IXMLSitemapItem) => boolean): IXMLSitemapItem[] {
  const map = new Map();

  for (let i = 0; i < items.length; i++) {
    if (discardInvalidNodesCallback(items[i])) {
      continue;
    }

    map.set(items[i].url, items[i]);
  }

  return Array.from(map.values());
}

export function getSitemapItemURL(baseurl: string, item: IXMLSitemapItem) {
  return url.resolve(baseurl, item.url);
}

export default {
  createSitemap,
  discardDuplicates,
}
