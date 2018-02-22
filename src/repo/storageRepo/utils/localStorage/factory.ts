import commonFsRepo from 'jscommons/dist/fsRepo';
import { defaultTo } from 'lodash';
import Facade from '../../Facade';
import createAttachments from '../../createAttachments/local';
import getAttachment from '../../getAttachment/local';
import FacadeConfig from './FacadeConfig';
import FactoryConfig from './FactoryConfig';

export default (factoryConfig: FactoryConfig = {}): Facade => {
  const facadeConfig: FacadeConfig = {
    storageDir: defaultTo(factoryConfig.storageDir, '/storage'),
  };
  return {
    ...commonFsRepo(facadeConfig),
    createAttachments: createAttachments(facadeConfig),
    getAttachment: getAttachment(facadeConfig),
  };
};
