// Report untranslated or changed GitHub descriptions; never mutate upstream data.
const fs = require('fs');
const path = require('path');
const json = path.resolve(__dirname, '../json');
const db = JSON.parse(fs.readFileSync(path.join(json, 'repos-database.json'), 'utf8'));
const translations = JSON.parse(fs.readFileSync(path.join(json, 'translations.zh-CN.json'), 'utf8'));
const repos = db.repos || [];
const described = repos.filter(repo => repo.description);
const missing = [];
const outdated = [];

for (const repo of described) {
  const translation = translations[(repo.fullName || '').toLowerCase()];
  if (!translation || !translation.zh) {
    missing.push(repo.fullName || repo.url);
  } else if (translation.source !== repo.description) {
    outdated.push(repo.fullName || repo.url);
  }
}

const report = [
  '## 简体中文翻译覆盖率', '',
  '- 当前仓库：' + repos.length,
  '- 有原文简介：' + described.length,
  '- 缺少中文翻译：' + missing.length,
  '- 原文已更新、待重译：' + outdated.length, '',
  ...(missing.length ? ['### 新增待翻译仓库', ...missing.map(name => '- ' + name), ''] : []),
  ...(outdated.length ? ['### 原文发生变更的仓库', ...outdated.map(name => '- ' + name), ''] : [])
].join('\n');

console.log(report);
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report + '\n', 'utf8');
}
