import StatementsResultOptions from '../../../serviceFactory/options/StatementsResultOptions';
import * as boolean from 'boolean';

export default (queryParams: any): StatementsResultOptions => {
  return {
    format: queryParams.format,
    attachments:
      queryParams.attachments !== undefined ? boolean(queryParams.attachments) : undefined
  };
};
