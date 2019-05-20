import Logger from '@app/Logger';
import { IXMLSitemapItem } from '@app/XML';
import {
  ISearchResponse,
  IPaginatedResponse,
  LogicalOperators,
  Operators,
  PublishingStatus
} from '@contentchef/contentchef-node';
import ContentChefClient from './ContentChefClient';
import getEnv from '@app/Env';
import { AxiosResponse } from 'axios';

export function filterRobotNoIndex(item: unknown): boolean {
  if (typeof item !== 'object') {
    return true;
  }

  if (!(Object.prototype.hasOwnProperty.call(item, 'seo'))) {
    return true;
  }

  if (!(Object.prototype.hasOwnProperty.call((item as any).seo, 'robots'))) {
    return true;
  }

  if (typeof (item as any).seo.robots !== 'string') {
    return true;
  }

  return (item as any).seo.robots.indexOf('noindex') < 0;
}

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

export async function searchIndexableContent(env: ReturnType<typeof getEnv>, publishingStatus: PublishingStatus): Promise<IXMLSitemapItem[]> {
  const clientMethods = ContentChefClient(env, publishingStatus);
  const take = 10;
  const firstCall = await clientMethods.search({
    take,
    skip: 0,
    propFilters: {
      condition: LogicalOperators.OR,
      items: [
        {
          field: 'url',
          operator: Operators.STARTS_WITH,
          value: '/',
        },
      ]
    }
  });

  if (!firstCall || !firstCall.data) {
    Logger.info(`No results were found`);
    return [];
  }

  const totalRecords = firstCall.data.total;
  const counter = Math.ceil(totalRecords / take);
  const promises = <Promise<AxiosResponse<IPaginatedResponse<ISearchResponse>>>[]>[];

  for (let i = 1; i < counter; i++) {
    promises.push(
      clientMethods.search({
        take,
        skip: counter * take,
      })
    );
  }

  const results = (await Promise.all(promises)).reduce((current, next) => {
    return [
      ... current,
      ... next.data.items,
    ]
  }, firstCall.data.items);

  Logger.info(`Found ${results.length} results`);

  return results.map(map);
}

export default searchIndexableContent;
