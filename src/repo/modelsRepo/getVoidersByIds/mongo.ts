import voidQuery from '../utils/mongoModels/voidQuery';
import getStatements from '../utils/mongoModels/getStatements';
import FacadeConfig from '../utils/mongoModels/FacadeConfig';
import Signature, { Opts } from './Signature';

interface Result { statement: { id: string; }; }

export default (config: FacadeConfig): Signature => {
  return async ({ client, ids }) => {
    const query = {
      'statement.id': { $in: ids },
      ...voidQuery
    };
    const project = { 'statement.id': 1 };
    const results = await getStatements({ config, query, project, client }) as Result[];

    return results.map((result) => {
      return result.statement.id;
    });
  };
};
