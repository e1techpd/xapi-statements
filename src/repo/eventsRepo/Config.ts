import FakeConfig from './utils/fakeEvents/Config';
import RedisConfig from './utils/redisEvents/Config';

export default interface Config {
  readonly facade: string;
  readonly fake: FakeConfig;
  readonly redis: {
    readonly url: string;
    readonly prefix: string;
  };
}
