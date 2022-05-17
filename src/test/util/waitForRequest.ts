import { MockedRequest, matchRequestUrl } from 'msw';
import type { SetupServerApi } from 'msw/node';

/**
 *
 * @see https://mswjs.io/docs/extensions/life-cycle-events#asserting-request-payload
 */
export const waitForRequest = (
  server: SetupServerApi,
  method: string,
  url: string
) => {
  let requestId = '';
  return new Promise<MockedRequest>((resolve, reject) => {
    server.events.on('request:start', (req) => {
      const matchesMethod = req.method.toLowerCase() === method.toLowerCase();
      const matchesUrl = matchRequestUrl(req.url, url).matches;
      if (matchesMethod && matchesUrl) {
        requestId = req.id;
      }
    });
    server.events.on('request:match', (req) => {
      if (req.id === requestId) {
        resolve(req);
      }
    });
    server.events.on('request:unhandled', (req) => {
      if (req.id === requestId) {
        reject(
          new Error(`The ${req.method} ${req.url.href} request was unhandled.`)
        );
      }
    });
  });
};
