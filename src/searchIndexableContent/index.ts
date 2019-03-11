import Logger from '@app/Logger';
import { IXMLSitemapItem } from '@app/XML';
import ContentChefClient from './ContentChefClient';
import { ISearchResponse } from '@contentchef/contentchef-node';

export function formatDate(date: string) {
  return date.split('T')[0];
}

export function getDate(item: ISearchResponse) {
  if (typeof item.metadata.contentLastModifiedDate === 'string') {
    return item.metadata.contentLastModifiedDate;
  }

  return item.metadata.publishedOn;
}

export function getURL(item: ISearchResponse): string {
  return item.publicId;
}

export function isUrl(input: string): boolean {
  return input.indexOf('/') === 0;
}

export function map(item: ISearchResponse): IXMLSitemapItem {
  const date = formatDate(getDate(item));
  const url = getURL(item);

  return { date, url };
}

export async function searchIndexableContent(): Promise<IXMLSitemapItem[]> {  
  const clientMethods = ContentChefClient();
  const result = await clientMethods.search({
    targetDate: new Date(),
  });

  if (!result || !result.data) {
    Logger.info(`No results were found`);
    return [];
  }

  Logger.info(`Found ${result.data.length} results`);

  return result.data.map(map);
}

export default searchIndexableContent;
