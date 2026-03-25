// 添加 Vite 类型声明
/// <reference types="vite/client" />

const modules = import.meta.glob("./*/*.js", { eager: true });

const messages = {};

Object.keys(modules).forEach((path) => {
  const match = path.match(/\.\/([^/]+)\/([^/]+)\.ts$/);
  if (match) {
    const [, lang] = match;
    const module = modules[path];
    if (!messages[lang]) {
      messages[lang] = { translation: {} };
    }
    // 合并翻译内容
    if (module.default) {
      messages[lang].translation = {
        ...messages[lang].translation,
        ...module.default,
      };
    }
  }
});

export default messages;
