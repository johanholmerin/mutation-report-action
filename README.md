# mutation-report-action

Show mutation report annotations in GitHub. Supports any framework using the
[mutation testing report schema][schema], e.g. [Stryker][stryker].

![GitHub Stryker Annotation Example](./images/annotation.png)

## GitHub Workflow config

```yaml
- name: Mutation Annotation Report
  uses: johanholmerin/mutation-report-action@0.2.0
  if: ${{ always() }} # Upload even if tests don't pass testing threshold
  with:
    repo-token: '${{ secrets.GITHUB_TOKEN }}'
    report-json: './reports/mutation/mutation.json' # Optional, default
```

## Stryker Configuration

Make sure to enable the [JSON reporter][stryker-json-reporter].

```javascript
"reporters": [...other reporters, "json"]
```

[schema]: https://github.com/stryker-mutator/mutation-testing-elements/tree/master/packages/report-schema
[stryker]: https://stryker-mutator.io/
[stryker-json-reporter]: https://stryker-mutator.io/docs/stryker-js/configuration#reporters-string
