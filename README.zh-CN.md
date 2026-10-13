# PS5 Repository List（简体中文）

**语言 / Langue：** 简体中文（当前文档） | [Français](README.md)

欢迎使用 **PS5 Repository List**！这是一个用于集中收录、整理和跟踪 PS5 相关 GitHub 项目的导航平台，涵盖自制程序（Homebrew）、模拟器、WebKit 漏洞利用工具和开发实用程序等。

## 🌟 主要功能

- **仓库分类**：根据分类和子分类浏览 PS5 相关项目。
- **搜索与视图**：实时搜索仓库、作者及说明；支持卡片和列表视图。
- **更新追踪**：显示最近的 Git 提交、发布版本（Releases）及可下载文件（Assets）。
- **多语言界面**：默认简体中文，可切换英语和法语；选择记录在浏览器本地。
- **自动更新**：使用 GitHub Actions 定期获取仓库元数据，并更新 JSON 数据库。

> 注意：界面的固定文案已翻译。第三方 GitHub 仓库的项目描述、README、提交记录及版本说明保留其原始语言，不会自动翻译。

## 📂 项目结构

```text
├── .github/workflows/deploy.yml   # 定时更新仓库数据库
├── json/
│   ├── repos-config.json          # 仓库列表、分类和显示颜色配置
│   └── repos-database.json        # 自动生成的仓库元数据
├── scripts/update-db.js           # GitHub API 数据同步脚本
├── tool/config_manager.py         # Python Tkinter 图形配置管理器
├── index.html                     # 网页主页
├── test.html                      # 测试页面
├── README.md                      # 法语说明
└── README.zh-CN.md                # 本文档
```

## 💻 如何使用

### 访问网页

这是基于 HTML、Vue 3 和 Tailwind CSS 的静态网页，无须额外部署后端服务。可通过 GitHub Pages 托管：

1. 在仓库 **Settings → Pages** 中将发布来源设为 **Deploy from a branch**。
2. 选择 **main** 分支和 **/(root)** 目录，保存设置。
3. Pages 发布完成后，访问仓库对应的 `https://<用户名>.github.io/<仓库名>/` 地址。

首次访问时默认显示简体中文。右上角的 **简中** 按钮可依次切换为 **EN** 和 **FR**，再次点击可切换回简体中文。

### 数据配置

- 在 `json/repos-config.json` 中维护仓库 URL、所属分类及颜色。
- `scripts/update-db.js` 调用 GitHub API 获取星标、最近提交、最新发布等信息，并写入 `json/repos-database.json`。
- `.github/workflows/deploy.yml` 设置了每小时执行一次的更新任务；Fork 后请到 **Actions** 确认该工作流是否已启用。

### Python 图形配置管理器

需要 Python 3 及 Tkinter，在仓库根目录执行：

```bash
python tool/config_manager.py
```

该工具可以添加、修改或删除 GitHub 仓库与分类，设置分类名称及十六进制颜色，并将修改保存回 `json/repos-config.json`。

配置管理器默认使用简体中文。如需恢复法语界面，可在启动前设置环境变量 `PS5_REPOS_LANG=fr`。

## 🔧 开发说明

页面优先读取 `json/repos-database.json` 的实时数据；若无法加载，则使用 HTML 中内置的备用数据快照。仓库说明、下载链接和历史提交信息来自项目原始数据，不随界面语言切换改变。

## 🤝 参与贡献

欢迎通过 Pull Request 完善简体中文翻译、更新 PS5 相关项目资料或修复问题。
