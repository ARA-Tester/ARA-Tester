import * as Ip from 'ip';
import { Config } from './../share/config';

const host: string = `${Ip.address()}:${Config.PORT}`;

process.once('loaded', () => {
  global['appHost'] = host;
});