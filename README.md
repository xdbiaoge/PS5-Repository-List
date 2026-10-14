# PS5 Repository List · 简体中文版

**语言：** 简体中文（默认） | [Français](README.fr.md)  
**原作者：** [nexgen999/PS5-Repository-List](https://github.com/nexgen999/PS5-Repository-List) · **中文版：** [xdbiaoge/PS5-Repository-List](https://github.com/xdbiaoge/PS5-Repository-List)

本项目是 PS5 自制程序、模拟器和实用工具的 GitHub 仓库导航与版本追踪站点。基于上游新版 React 界面，针对简体中文进行了适配，不更改第三方仓库地址、提交记录或发布附件。

**在线访问：** https://xdbiaoge.github.io/PS5-Repository-List/

## 特性

- 全新的响应式界面，支持手机、平板、电脑和 PS5 浏览器布局。
- 27 种界面语言，**默认简体中文**；可在设置中自由选择。
- 中文分类名称，以及收录仓库的中文简介；切换其他语言恢复 GitHub 原始简介。
- 搜索、分类、星标、提交动态、发布版本、下载附件及 README 阅读。
- 主题、字体、侧边栏显示方式及 REST API 地址等个性化选项。
- GitHub Actions 每小时检查仓库元数据，中文简介覆盖率可在 Actions Summary 查看。

## 文件结构

```text
index.html                   # 新版 React 网站入口
test.html                    # 与主页相同的测试入口
assets/index.js              # 上游编译的 React 前端（已接入中文适配）
assets/index.css             # 上游前端样式
assets/zh-adapter.js         # 中文分类及仓库简介显示适配层
json/repos-config.json      # 原始分类、仓库清单
json/repos-database.json    # GitHub 仓库数据库（自动更新）
json/translations.json      # 界面多语言词库
json/translations.zh-CN.json # 独立维护的仓库中文简介词库
scripts/update-db.js        # 仓库信息自动更新
scripts/check-translations.js # 中文简介覆盖率检查
tool/config_manager.py      # Tkinter 中文图形配置管理器
README.fr.md                # 原作者法语说明
```

## 使用与部署

无须 Docker 或独立服务器。进入仓库 **Settings → Pages**，选择 **Deploy from a branch** → `main` → `/(root)`，保存后即可通过上方地址访问。

默认读取本站的 `json/repos-database.json`。在设置中可以调整 REST API 地址；默认远程备选地址使用本 Fork 的 GitHub Raw 数据，不依赖原作者的站点。升级前在旧版页面保存的语言选项不影响新版的首次简体中文默认值。

若中文词库里记录的英文原文与最新 GitHub 简介不一致，界面会显示最新原文，防止使用过期翻译。缺失或变更项可在 GitHub Actions 更新任务的运行摘要中查看，但该检查不会阻止更新。

### 本地配置工具

安装 Python 3 与 Tkinter 后，在项目根目录运行：

```bash
python tool/config_manager.py
```

默认中文界面；分类下拉框展示中文名称及原始 ID，保存时仍使用原始 `categoryId`。如需法语界面，可设置 `PS5_REPOS_LANG=fr` 环境变量。

## 更新说明

上游将原本的单文件 Vue 页面改为 React 编译产物。本 Fork 保留上游前端，同时通过独立适配模块维护中文分类和简介。后续同步上游时，应将新版 `assets/index.js` 中的语言与数据适配入口一并保留；不要直接覆盖中文适配模块或词库。


### 2026-10-14 上游同步

已合并上游 `35f06baea8263fe52e6b9f6b7f6d76902eaf4825` 及此前 23 个提交，更新前端、样式和仓库数据库。补齐设置、排序、列表、提交与版本弹窗以及移动端和 PS5 布局的中文文案，并重新翻译 3 个原文有变化的仓库简介。保留默认简体中文、中文配置工具、中文分类和独立简介词库。第三方项目名称、提交内容与发布日志保留原文。
