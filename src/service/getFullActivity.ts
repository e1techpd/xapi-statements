import GetFullActivityOptions from '../serviceFactory/options/GetFullActivityOptions';
import GetFullActivityResult from '../serviceFactory/results/GetFullActivityResult';
import checkProfileReadScopes from './utils/checkProfileReadScopes';
import Config from './Config';

export default (config: Config) => {
  return async (opts: GetFullActivityOptions): Promise<GetFullActivityResult> => {
    checkProfileReadScopes(opts.client.scopes);
    const fullActivityResult = await config.repo.getFullActivity(opts);
    return {
      objectType: 'Activity',
      id: fullActivityResult.id,
      definition: {
        name: fullActivityResult.name,
        description: fullActivityResult.description,
      },
    };
  };
};
