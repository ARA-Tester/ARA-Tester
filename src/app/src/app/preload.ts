import * as Ip from 'ip';
import { Config } from './../share/config';

const host: string = `${Ip.address()}:${Config.PORT}`;

alert(host);

process.once('loaded', () => {
  window.location.host = host;
});