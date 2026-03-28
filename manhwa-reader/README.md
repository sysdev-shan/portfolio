# Manhwa Reader — CLI Terminal App

A terminal/CLI-based **manhwa and manhua reader** inspired by [mihonapp/mihon](https://github.com/mihonapp/mihon).  
Runs entirely in the command line using a rich TUI built with [Textual](https://github.com/Textualize/textual).

---

## Features

| Feature | Description |
|---|---|
| 🏠 **Home** | Library, Updates and History tabs |
| 🔍 **Browse** | Popular, Latest, and full-text Search with filters |
| 📖 **Manga Detail** | Cover + metadata + chapter list |
| 📄 **Reader** | Full-screen page reader with multiple reading modes |
| ⬇ **Downloads** | Queue-based chapter download manager |
| ⚙ **Settings** | Reading direction, mode, quality, paths |

---

## Requirements

- Python 3.10+
- Terminal with UTF-8 support (recommended: kitty, WezTerm, iTerm2, or any modern terminal)

---

## Installation

```bash
cd manhwa-reader
pip install -r requirements.txt
```

> **Optional:** Install `chafa` system package for broader image format support:
> ```bash
> # macOS
> brew install chafa
> # Ubuntu/Debian
> sudo apt install chafa
> ```

---

## How to Run

```bash
python main.py
```

---

## Keyboard Shortcuts

### Global

| Key | Action |
|---|---|
| `Ctrl+B` | Open Browse screen |
| `Ctrl+D` | Open Downloads screen |
| `Ctrl+S` | Open Settings screen |
| `Ctrl+Q` | Quit |

### Home Screen

| Key | Action |
|---|---|
| `r` | Refresh library |
| `b` | Open Browse |

### Browse Screen

| Key | Action |
|---|---|
| `Enter` | Open selected manga |
| `Escape` / `q` | Back |
| `r` | Refresh current tab |

### Reader Screen

| Key | Action |
|---|---|
| `←` / `h` | Previous page |
| `→` / `l` | Next page |
| `j` | Scroll / next page (webtoon) |
| `k` | Scroll / prev page (webtoon) |
| `[` | Previous chapter |
| `]` | Next chapter |
| `m` | Cycle reading mode (single → double → webtoon) |
| `f` | Toggle zen / fullscreen mode |
| `b` | Cycle background colour (dark → light → sepia) |
| `d` | Download current chapter |
| `q` / `Escape` | Exit reader |

---

## Project Structure

```
manhwa-reader/
├── main.py                         # Entry point
├── requirements.txt
├── README.md
├── source_api/
│   ├── base.py                     # Abstract Source interface
│   ├── models.py                   # SManga, SChapter, Page dataclasses
│   └── sources/
│       └── mangadex.py             # MangaDex API v5 implementation
├── core/
│   ├── library.py                  # Library management
│   ├── history.py                  # Reading history
│   ├── downloader.py               # Chapter download manager
│   └── settings.py                 # App preferences
└── ui/
    ├── app.py                      # Main Textual App
    ├── screens/
    │   ├── home.py                 # Home screen
    │   ├── browse.py               # Browse/explore screen
    │   ├── manga_detail.py         # Manga detail screen
    │   ├── reader.py               # Reader screen
    │   ├── downloads.py            # Downloads screen
    │   └── settings_screen.py      # Settings screen
    └── widgets/
        ├── manga_card.py           # Manga card widget
        ├── chapter_list.py         # Chapter list widget
        └── filter_panel.py         # Filter panel widget
```

---

## Data Storage

All data is persisted in `~/.manhwa-reader/`:

| File | Contents |
|---|---|
| `settings.json` | App preferences |
| `library.json` | Saved titles and categories |
| `history.json` | Reading history (last chapter / page) |
| `cache/` | Cached page images (temp) |
| `downloads/` | Permanently downloaded chapters |

---

## Source API

The source interface mirrors [Mihon's source-api](https://github.com/mihonapp/mihon) design:

```python
class Source(ABC):
    async def get_manga_details(self, manga: SManga) -> SManga: ...
    async def get_chapter_list(self, manga: SManga) -> list[SChapter]: ...
    async def get_page_list(self, chapter: SChapter) -> list[Page]: ...

class CatalogueSource(Source, ABC):
    async def get_popular_manga(self, page: int) -> MangasPage: ...
    async def get_search_manga(self, page, query, filters) -> MangasPage: ...
    async def get_latest_updates(self, page: int) -> MangasPage: ...
```

---

## Screenshots

> _Screenshots will be added once the terminal rendering environment is configured._

---

## License

MIT
