import assertError from 'jscommons/dist/tests/utils/assertError';
import ExtraAttachments from '../../errors/ExtraAttachments';
import MissingAttachments from '../../errors/MissingAttachments';
import setup from '../utils/setup';
import createAttachment from '../utils/createAttachment';
import createAttachmentModel from '../utils/createAttachmentModel';
import createAttachmentStatement from '../utils/createAttachmentStatement';
import createAttachmentSubStatement from '../utils/createAttachmentSubStatement';
import storeStatementsInService from '../utils/storeStatementsInService';

const TEST_ID = '1c86d8e9-f325-404f-b3d9-24c451035582';
const TEST_CONTENT_A = 'A';
const TEST_CONTENT_B = 'B';
const TEST_ATTACHMENT_MODEL_A = createAttachmentModel(TEST_CONTENT_A);
const TEST_ATTACHMENT_MODEL_B = createAttachmentModel(TEST_CONTENT_B);
const TEST_ATTACHMENT_A = createAttachment(TEST_CONTENT_A);
const TEST_ATTACHMENT_B = createAttachment(TEST_CONTENT_B);

describe('store statements with attachments', () => {
  const service = setup();
  const storeStatements = storeStatementsInService(service);

  it('should store the attachment when it is valid', async () => {
    const testStatement = createAttachmentStatement([TEST_ATTACHMENT_A]);
    await storeStatements([testStatement], [TEST_ATTACHMENT_MODEL_A]);
  });

  it('should throw an error when there is a missing SHA from the statements', async () => {
    const testStatement = createAttachmentStatement([TEST_ATTACHMENT_A, TEST_ATTACHMENT_B]);
    const promise = storeStatements([testStatement], [TEST_ATTACHMENT_MODEL_A]);
    await assertError(MissingAttachments, promise);
  });

  it('should throw an error when there is a missing SHA from a statement', async () => {
    const testStatement = createAttachmentStatement([TEST_ATTACHMENT_A, TEST_ATTACHMENT_B]);
    const promise = storeStatements([testStatement], [TEST_ATTACHMENT_MODEL_A]);
    await assertError(MissingAttachments, promise);
  });

  it('should throw an error when there is an extra SHA', async () => {
    const testStatement = createAttachmentStatement([TEST_ATTACHMENT_A]);
    const promise = storeStatements(
      [testStatement],
      [TEST_ATTACHMENT_MODEL_A, TEST_ATTACHMENT_MODEL_B]
    );
    await assertError(ExtraAttachments, promise);
  });

  it('should throw an error when there is a missing SHA from the sub statements', async () => {
    const testStatement = createAttachmentSubStatement([TEST_ATTACHMENT_A, TEST_ATTACHMENT_B]);
    const promise = storeStatements([testStatement], [TEST_ATTACHMENT_MODEL_A]);
    await assertError(MissingAttachments, promise);
  });

  it('should throw an error when there is a missing SHA from a sub statement', async () => {
    const testStatement = createAttachmentSubStatement([TEST_ATTACHMENT_A, TEST_ATTACHMENT_B]);
    const promise = storeStatements([testStatement], [TEST_ATTACHMENT_MODEL_A]);
    await assertError(MissingAttachments, promise);
  });

  it('should not error when reinserting a statement with an ID and attachments', async () => {
    const testStatement = createAttachmentStatement([TEST_ATTACHMENT_A], TEST_ID);
    await storeStatements([testStatement], [TEST_ATTACHMENT_MODEL_A]);
    await storeStatements([testStatement], [TEST_ATTACHMENT_MODEL_A]);
  });
});
