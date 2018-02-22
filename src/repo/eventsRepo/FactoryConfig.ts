import FakeFactoryConfig from './utils/fakeEvents/FactoryConfig';
import RedisFactoryConfig from './utils/redisEvents/FactoryConfig';

export default interface FactoryConfig {
  readonly facade?: string;
  readonly fake?: FakeFactoryConfig;
  readonly redis?: RedisFactoryConfig;
}
