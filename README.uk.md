<p align="center">
  <a href="https://nova.ai">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="Nova logo">
    </picture>
  </a>
</p>
<p align="center">AI-агент для програмування з відкритим кодом.</p>
<p align="center">
  <a href="https://nova.ai/discord"><img alt="Discord" src="https://img.shields.io/discord/1391832426048651334?style=flat-square&label=discord" /></a>
  <a href="https://www.npmjs.com/package/nova-ai"><img alt="npm" src="https://img.shields.io/npm/v/nova-ai?style=flat-square" /></a>
  <a href="https://github.com/anomalyco/nova/actions/workflows/publish.yml"><img alt="Build status" src="https://img.shields.io/github/actions/workflow/status/anomalyco/nova/publish.yml?style=flat-square&branch=dev" /></a>
</p>

<p align="center">
  <a href="README.md">English</a> |
  <a href="README.zh.md">简体中文</a> |
  <a href="README.zht.md">繁體中文</a> |
  <a href="README.ko.md">한국어</a> |
  <a href="README.de.md">Deutsch</a> |
  <a href="README.es.md">Español</a> |
  <a href="README.fr.md">Français</a> |
  <a href="README.it.md">Italiano</a> |
  <a href="README.da.md">Dansk</a> |
  <a href="README.ja.md">日本語</a> |
  <a href="README.pl.md">Polski</a> |
  <a href="README.ru.md">Русский</a> |
  <a href="README.bs.md">Bosanski</a> |
  <a href="README.ar.md">العربية</a> |
  <a href="README.no.md">Norsk</a> |
  <a href="README.br.md">Português (Brasil)</a> |
  <a href="README.th.md">ไทย</a> |
  <a href="README.tr.md">Türkçe</a> |
  <a href="README.uk.md">Українська</a> |
  <a href="README.bn.md">বাংলা</a> |
  <a href="README.gr.md">Ελληνικά</a> |
  <a href="README.vi.md">Tiếng Việt</a>
</p>

[![Nova Terminal UI](packages/web/src/assets/lander/screenshot.png)](https://nova.ai)

---

### Встановлення

```bash
# YOLO
curl -fsSL https://nova.ai/install | bash

# Менеджери пакетів
npm i -g nova-ai@latest        # або bun/pnpm/yarn
scoop install nova             # Windows
choco install nova             # Windows
brew install anomalyco/tap/nova # macOS і Linux (рекомендовано, завжди актуально)
brew install nova              # macOS і Linux (офіційна формула Homebrew, оновлюється рідше)
sudo pacman -S nova            # Arch Linux (Stable)
paru -S nova-bin               # Arch Linux (Latest from AUR)
mise use -g nova               # Будь-яка ОС
nix run nixpkgs#nova           # або github:anomalyco/nova для найновішої dev-гілки
```

> [!TIP]
> Перед встановленням видаліть версії старші за 0.1.x.

### Десктопний застосунок (BETA)

Nova також доступний як десктопний застосунок. Завантажуйте напряму зі [сторінки релізів](https://github.com/anomalyco/nova/releases) або [nova.ai/download](https://nova.ai/download).

| Платформа             | Завантаження                       |
| --------------------- | ---------------------------------- |
| macOS (Apple Silicon) | `nova-desktop-mac-arm64.dmg`   |
| macOS (Intel)         | `nova-desktop-mac-x64.dmg`     |
| Windows               | `nova-desktop-windows-x64.exe` |
| Linux                 | `.deb`, `.rpm` або AppImage        |

```bash
# macOS (Homebrew)
brew install --cask nova-desktop
# Windows (Scoop)
scoop bucket add extras; scoop install extras/nova-desktop
```

#### Каталог встановлення

Скрипт встановлення дотримується такого порядку пріоритету для шляху встановлення:

1. `$NOVA_INSTALL_DIR` - Користувацький каталог встановлення
2. `$XDG_BIN_DIR` - Шлях, сумісний зі специфікацією XDG Base Directory
3. `$HOME/bin` - Стандартний каталог користувацьких бінарників (якщо існує або його можна створити)
4. `$HOME/.nova/bin` - Резервний варіант за замовчуванням

```bash
# Приклади
NOVA_INSTALL_DIR=/usr/local/bin curl -fsSL https://nova.ai/install | bash
XDG_BIN_DIR=$HOME/.local/bin curl -fsSL https://nova.ai/install | bash
```

### Агенти

Nova містить два вбудовані агенти, між якими можна перемикатися клавішею `Tab`.

- **build** - Агент за замовчуванням із повним доступом для завдань розробки
- **plan** - Агент лише для читання для аналізу та дослідження коду
  - За замовчуванням забороняє редагування файлів
  - Запитує дозвіл перед запуском bash-команд
  - Ідеально підходить для дослідження незнайомих кодових баз або планування змін

Також доступний допоміжний агент **general** для складного пошуку та багатокрокових завдань.
Він використовується всередині системи й може бути викликаний у повідомленнях через `@general`.

Дізнайтеся більше про [agents](https://nova.ai/docs/agents).

### Документація

Щоб дізнатися більше про налаштування Nova, [**перейдіть до нашої документації**](https://nova.ai/docs).

### Внесок

Якщо ви хочете зробити внесок в Nova, будь ласка, прочитайте нашу [документацію для контриб'юторів](./CONTRIBUTING.md) перед надсиланням pull request.

### Проєкти на базі Nova

Якщо ви працюєте над проєктом, пов'язаним з Nova, і використовуєте "nova" у назві, наприклад "nova-dashboard" або "nova-mobile", додайте примітку до свого README.
Уточніть, що цей проєкт не створений командою Nova і жодним чином не афілійований із нами.

---

**Приєднуйтеся до нашої спільноти** [Discord](https://discord.gg/nova) | [X.com](https://x.com/nova)
