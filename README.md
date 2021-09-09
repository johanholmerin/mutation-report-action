# stryker-report-action

Show [Stryker](https://stryker-mutator.io/) report annotations in GitHub.

![GitHub Stryker Annotation Example](./images/annotation.png)

## GitHub Workflow config

```yaml
- name: Stryker Annotation Report
  uses: johanholmerin/stryker-report-action@0.1.0
  if: ${{ always() }} # Upload even if tests don't pass Stryker threshold
  with:
    repo-token: '${{ secrets.GITHUB_TOKEN }}'
    report-json: './reports/mutation/mutation.json' # Optional, default
```

## Stryker Configuration

Make sure to enable the [JSON reporter](https://stryker-mutator.io/docs/stryker-js/configuration#reporters-string).

```javascript
"reporters": [...other reporters, "json"]
```
