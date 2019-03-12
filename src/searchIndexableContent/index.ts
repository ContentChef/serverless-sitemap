import Logger from '@app/Logger';
import { IXMLSitemapItem } from '@app/XML';
import { ISearchResponse } from '@contentchef/contentchef-node';
import ContentChefClient from './ContentChefClient';
import getEnv from '@app/Env';

export function getDate(item: ISearchResponse) {
  if (typeof item.metadata.contentLastModifiedDate === 'string') {
    return item.metadata.contentLastModifiedDate;
  }

  return item.metadata.publishedOn;
}

export function getLinkedContent(item: ISearchResponse): unknown {
  return item.payload.linkedContents;
}

export function getURL(item: ISearchResponse): string {
  if (!hasPayload(item)) {
    return '';
  }

  if ('url' in item.payload) {
    return item.payload.url;
  }

  return '';
}

export function hasLinkedContent(item: ISearchResponse): boolean {
  if (hasPayload(item)) {
    return 'linkedContents' in item.payload;
  }

  return false;
}

export function hasPayload(item: ISearchResponse): boolean {
  return 'payload' in item;
}

export function isUrl(input: string): boolean {
  return input.indexOf('/') === 0;
}

export function map(item: ISearchResponse): IXMLSitemapItem {
  const date = getDate(item);
  const url = getURL(item);

  return { 
    date,
    url,
  };
}

export async function searchIndexableContent(env: ReturnType<typeof getEnv>): Promise<IXMLSitemapItem[]> {  
  const clientMethods = ContentChefClient(env);
  const result = await clientMethods.search({
    // targetDate: new Date().toJSON(),
  });

  if (!result || !result.data) {
    Logger.info(`No results were found`);
    return [];
  }

  Logger.info(`Found ${result.data.length} results`);

  return result.data.map(map);
}

export default searchIndexableContent;
