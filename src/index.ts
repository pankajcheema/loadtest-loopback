import {LoadTestPostgressApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {LoadTestPostgressApplication};

export async function main(options: ApplicationConfig = {}) {
  const app = new LoadTestPostgressApplication(options);
  await app.boot();
  await app.start();
  await app.migrateSchema();
  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
