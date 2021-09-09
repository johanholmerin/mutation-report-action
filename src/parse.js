const ANNOTATION_VALUES = {
  Ignored: 'notice',
  Timeout: 'warning',
  Survived: 'failure',
};

function parseReport({ report, name, cwd }) {
  let survivedCount = 0;
  let timeoutCount = 0;
  let ignoredCount = 0;
  const annotations = [];

  for (const filePath in report.files) {
    const file = report.files[filePath];
    for (const mutant of file.mutants) {
      if (mutant.status === 'Survived') survivedCount++;
      else if (mutant.status === 'Ignored') ignoredCount++;
      else if (mutant.status === 'Timeout') timeoutCount++;

      if (mutant.status in ANNOTATION_VALUES) {
        const path = filePath.substring(cwd.length + 1);
        let message = `${mutant.status}: ${mutant.mutatorName}`;
        message += ` \`${mutant.replacement}\``;
        if (mutant.statusReason) {
          message += ` - ${mutant.statusReason}`;
        }
        const annotation = {
          path,
          message,
          start_line: mutant.location.start.line,
          end_line: mutant.location.end.line,
          annotation_level: ANNOTATION_VALUES[mutant.status],
        };
        // Annotations only support start_column and end_column on the same line
        if (annotation.start_line === annotation.end_line) {
          Object.assign(annotation, {
            start_column: mutant.location.start.column,
            end_column: mutant.location.end.column,
          });
        }
        annotations.push(annotation);
      }
    }
  }

  return {
    conclusion: 'success',
    output: {
      title: name,
      summary: [
        `${survivedCount} survived`,
        `${timeoutCount} timeout`,
        `${ignoredCount} ignored`,
      ].join(', '),
      annotations,
    },
  };
}

module.exports = { parseReport };
