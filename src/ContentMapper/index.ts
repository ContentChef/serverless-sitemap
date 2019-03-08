import { IXMLSitemapItem } from '@app/XML';
import { IGetRequestMethodsList } from '@contentchef/contentchef-node/dist/services/Channel';
import parser from './parser';

function discardDuplicates(items: IXMLSitemapItem[]): IXMLSitemapItem[] {
  const map = new Map();

  for (let i = 0; i < items.length; i++) {
    if (!parser.isUrl(items[i].url)) {
      continue;
    }
    
    map.set(items[i].url, items[i]);
  }

  return Array.from(map.values());
}

export async function ContentMapper(clientMethods: IGetRequestMethodsList): Promise<IXMLSitemapItem[]> {
  const result = await clientMethods.search({
    // targetDate: new Date();
  });

  if (!result || !result.data) {
    return [];
  }

  const items = result.data.map(parser.map);

  return discardDuplicates(items);
}

export default ContentMapper;
