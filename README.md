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

### 2026-10-16 上游数据同步

已同步原作者 `nexgen999/PS5-Repository-List` 至提交 [`31bbab3`](https://github.com/nexgen999/PS5-Repository-List/commit/31bbab3d69796b69c554445c0f498b127fad9631)（自上次 `35f06ba` 起的 7 次自动仓库数据更新）。同步后的数据库更新至 2026-10-15 12:19:49 UTC，仍收录 210 个仓库。本次没有上游前端与分类变更；保留本项目现有的简体中文 UI、中文简介适配、独立词库、网站入口及 GitHub Pages 配置。同时修正 `elmonomalvad0/any-pad` 英文简介由 `PS%` 至 `PS5` 的对应原文，现有中文译文无需改变。所有有英文简介的项目均已有对应简体中文译文，且与当前数据库匹配。

### 2026-10-17 上游数据同步

已合并上游 `nexgen999/PS5-Repository-List` 至提交 [`074b563`](https://github.com/nexgen999/PS5-Repository-List/commit/074b5632dbee50a0522dbb08916dfaddf39eb945)，包含自上次 `31bbab3` 后新增的 10 次自动数据更新。最新仓库数据库生成于 2026-10-17 02:03:31 UTC，收录仓库仍为 210 个，上游前端、分类与功能代码均无变化。补充 `smoxa/ps5-new-overlay` 的中文简介，现在所有带英文简介的仓库都具有匹配的中文翻译。保留默认简体中文、中文分类、独立翻译词库、前端适配、中文配置工具和 GitHub Pages 设置。

### 2026-10-18 上游同步

已合并原作者仓库至提交 [`59a2ba6`](https://github.com/nexgen999/PS5-Repository-List/commit/59a2ba645575882efebcb92e453a0c1c64be9137)，包含自上次 `074b563` 后的 21 次提交。上游数据库更新至 2026-10-18 07:05:32 UTC：收录记录从 210 增至 269（新增 69 条、移除 8 条），分类从 23 增至 25。同步最新 `json/repos-config.json`、`json/repos-database.json`，以及新增的待收录清单 `Repository-to-add/next_add.md` 和原作者配置工具 `tool/config_manager_v0.2.py`（该新增工具保留上游原文，原来的 `tool/config_manager.py` 继续支持简体中文）。补齐新增项目的中文简介，新增两种分类的网页与中文配置工具显示映射。保留中文版首页、React 汉化脚本、多语言 UI 词库、GitHub Pages 配置与中文文档。

### 2026-10-19 上游同步

已合并原作者 `nexgen999/PS5-Repository-List` 的最新提交 [`abe476e`](https://github.com/nexgen999/PS5-Repository-List/commit/abe476e4e11852c95ef6ab851c2c020fc6e6a43d) 及自上次 `59a2ba6` 后的 5 次自动仓库数据更新。数据库生成于 2026-10-19 00:40:15 UTC，收录记录从 269 变为 268（新增 3 条、移除 4 条），分类仍为 25 个。新增 Swordpdf/ProsperoEden、LedyBacer/ProsperoLight 和 quatrixone/ProsperoAI 的中文简介；同步 RetroArch 模拟核心数量变化、SwanStationPS5 原文链接更新以及 PS5 Payloads Mirror 文件夹更新工具的新说明。本次上游无前端代码变更，继续保留独立简体中文适配、GitHub Pages 发布与中文管理工具。

### 2026-10-20 上游同步

合并上游 `nexgen999/PS5-Repository-List` 至提交 [`a15509a`](https://github.com/nexgen999/PS5-Repository-List/commit/a15509adf027ac92a7c6b970af41298e7e2b18f7)，同步自 `abe476e` 以来的 9 次提交。上游数据库更新于 2026-10-20 10:40:52 UTC，收录记录由 268 变成 267（新增 2 项、移除 3 项），分类保持 25 个不变；同步 `json/repos-config.json` 与 `json/repos-database.json`。补齐 premohq/PS5-ECAM、HandshakeHackin/youtube-maxd 的简体中文简介，并更新 darkxex/ProsperoStore、MiladRTX/Breeze、nileshchakraborty/AstraPlay 的原文映射及中文说明。上游前端未变化，继续保留中文版首页、React 汉化适配、中文多语言词库、独立简介词库、中文管理器及 GitHub Pages 配置。
