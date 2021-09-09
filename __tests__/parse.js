/* eslint-env jest */
const { parseReport } = require('../src/parse.js');
const report = require('./fixtures/report.json');

it('parseReport', () => {
  const cwd = '/FAKE_PATH';
  const name = 'FAKE_TITLE';

  expect(parseReport({ report, name, cwd })).toEqual({
    conclusion: 'success',
    output: {
      annotations: [
        {
          annotation_level: 'failure',
          end_line: 3,
          message: 'Survived: BlockStatement `{}`',
          path: 'src/index.js',
          start_line: 1,
        },
        {
          annotation_level: 'warning',
          end_column: 64,
          end_line: 123,
          message: 'Timeout: UpdateOperator `index--`',
          path: 'src/index.js',
          start_column: 57,
          start_line: 123,
        },
        {
          annotation_level: 'notice',
          end_line: 76,
          message: 'Ignored: ConditionalExpression `true` - some valid reason',
          path: 'src/index.js',
          start_line: 75,
        },
      ],
      summary: '1 survived, 1 timeout, 1 ignored',
      title: 'FAKE_TITLE',
    },
  });
});
