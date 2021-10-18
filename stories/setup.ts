import { HttpService } from '../src/services/http'

const TestingApiBaseUrl = 'https://api.superciety.com'

export const getTestingHttpService = () => {
  const httpService = new HttpService(TestingApiBaseUrl)

  httpService.onUnauthorized = () => alert('Unauthorized.')

  return httpService
}
