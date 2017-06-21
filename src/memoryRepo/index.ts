import Repo from '../repo';
import Config from './Config';
import clearRepo from './clearRepo';
import createAttachments from './createAttachments';
import createStatements from './createStatements';
import getHashes from './getHashes';
import getStatement from './getStatement';
import getStatements from './getStatements';
import getVoidersByObjectIds from './getVoidersByObjectIds';
import getVoidersByIds from './getVoidersByIds';
import voidStatements from './voidStatements';
import getDownRefId from './getDownRefId';
import getUpRefIds from './getUpRefIds';
import setRefs from './setRefs';
import getStatementsByIds from './getStatementsByIds';
import getUpRefsByIds from './getUpRefsByIds';
import getAttachments from './getAttachments';

export default (config: Config): Repo => {
  return {
    // Statement functions.
    createStatements: createStatements(config),
    getHashes: getHashes(config),
    getStatement: getStatement(config),
    getStatements: getStatements(config),
    getVoidersByObjectIds: getVoidersByObjectIds(config),
    getVoidersByIds: getVoidersByIds(config),
    voidStatements: voidStatements(config),
    getDownRefId: getDownRefId(config),
    getUpRefIds: getUpRefIds(config),
    setRefs: setRefs(config),
    getStatementsByIds: getStatementsByIds(config),
    getUpRefsByIds: getUpRefsByIds(config),

    // Attachment functions.
    createAttachments: createAttachments(config),
    getAttachments: getAttachments(config),

    // Repo-wide functions.
    clearRepo: clearRepo(config),
    migrate: () => Promise.resolve(),
    rollback: () => Promise.resolve(),
  };
};
