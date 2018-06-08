import {AkigaiApiApplication} from './application';
import {ApplicationConfig} from '@loopback/core';

export {AkigaiApiApplication};

export async function main(options?: ApplicationConfig) {
  const app = new AkigaiApiApplication(options);
  await app.boot();
  await app.start();
  return app;
}
