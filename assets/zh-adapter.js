// Localize the React UI without modifying its original GitHub JSON.
const CATEGORY_NAMES = {
  "cat-frontend": "PS5 模拟器",
  "cat-backend": "WebKit 漏洞利用",
  "cat-desktop-mobile": "PC 应用程序",
  "cat-PS5_Cheat": "PS5 金手指工具",
  "cat-PS5_Overlay": "PS5 叠加层插件",
  "cat-PS5_Remote": "PS5 远程控制与串流",
  "cat-ps5-webkit-autoloader": "PS5 WebKit 自动加载器",
  "cat-ps5_audio_utility": "PS5 音频工具",
  "cat-ps5_dns": "PS5 DNS 工具",
  "cat-ps5_emulator": "PS5 模拟器",
  "cat-ps5_fan": "PS5 风扇控制",
  "cat-ps5_file_explorer": "PS5 文件管理器",
  "cat-ps5_freeshop": "PS5 应用与游戏商店",
  "cat-ps5_game_dump": "PS5 游戏转储与挂载",
  "cat-ps5_hen_loader": "PS5 HEN 与加载器",
  "cat-ps5_kstuff": "PS5 kstuff 组件",
  "cat-ps5_linux": "PS5 Linux",
  "cat-ps5_pad_utility": "PS5 手柄工具",
  "cat-ps5_pkg_tool": "PS5 PKG 工具",
  "cat-ps5_saves": "PS5 游戏存档管理",
  "cat-ps5_sdk_debug": "PS5 开发与调试",
  "cat-ps5_server": "PS5 远程服务器",
  "cat-ps5_themes-avatars": "PS5 主题与头像",
  "cat-ps5_utility": "PS5 综合工具",
  "cat-ps5_video_player": "PS5 视频与媒体播放",
  "cat-ps5_cloud_gaming": "PS5 云游戏",
  "cat-pc-ps5-dev": "PC 端 PS5 开发工具",
  "cat-pc_apps": "PC 应用工具"
};
let translationsPromise;
function getDescriptions() {
  if (!translationsPromise) {
    translationsPromise = fetch(new URL('../json/translations.zh-CN.json', import.meta.url), {cache: 'no-cache'})
      .then(response => response.ok ? response.json() : {})
      .catch(error => { console.warn('Chinese translations unavailable:', error); return {}; });
  }
  return translationsPromise;
}
export async function localizeDatabase(db, language) {
  if (language !== 'zh') return db;
  const translations = await getDescriptions();
  return {
    ...db,
    categories: (db.categories || []).map(item => ({...item, name: CATEGORY_NAMES[item.id] || item.name})),
    repos: (db.repos || []).map(item => {
      const originalDescription = item.description || '';
      const entry = translations[(item.fullName || '').toLowerCase()];
      const description = entry && entry.source === item.description && typeof entry.zh === 'string'
        ? entry.zh : originalDescription;
      return {...item, originalDescription, description};
    })
  };
}
