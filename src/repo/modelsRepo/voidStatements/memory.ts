import matchesClientOption from '../utils/memoryModels/matchesClientOption';
import FacadeConfig from '../utils/memoryModels/FacadeConfig';
import Signature, { Opts } from './Signature';

export default (config: FacadeConfig): Signature => {
  return async ({ client, ids }) => {
    config.state.statements = config.state.statements.map((model) => {
      if (ids.includes(model.statement.id) && matchesClientOption(model, client)) {
        model.voided = true;
      }
      return model;
    });
  };
};
