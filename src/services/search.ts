import { instantMeiliSearch } from '@meilisearch/instant-meilisearch'

export interface ISearchService {
  readonly hostUrl: string
  readonly apiKey: string
  readonly index: string
  query: (query: string, filter: string) => Promise<{ [key: string]: any }[]>
}

export class SearchService implements ISearchService {
  hostUrl: string
  apiKey: string
  index: string

  constructor(hostUrl: string, apiKey: string, index: string) {
    this.hostUrl = hostUrl
    this.apiKey = apiKey
    this.index = index
  }

  public query = async <T>(query: string, filter: string) => {
    const searchClient = instantMeiliSearch(this.hostUrl, this.apiKey)
    const searchResponse = await searchClient.search([{ indexName: this.index, params: { query: query, filters: filter } }])
    return <T>searchResponse.results[0].hits
  }
}
