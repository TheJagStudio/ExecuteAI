#!/usr/bin/env python3
"""Copy the Vite production build into Django templates and static files."""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / "frontend" / "dist"
TEMPLATES = ROOT / "backend" / "templates"
STATIC = ROOT / "backend" / "static"


def main() -> None:
    index = DIST / "index.html"
    if not index.exists():
        raise SystemExit(f"Frontend build missing: {index}. Run `npm run build` in frontend/.")

    TEMPLATES.mkdir(parents=True, exist_ok=True)
    STATIC.mkdir(parents=True, exist_ok=True)

    shutil.copy2(index, TEMPLATES / "index.html")

    dist_assets = DIST / "assets"
    static_assets = STATIC / "assets"
    if static_assets.exists():
        shutil.rmtree(static_assets)
    if dist_assets.exists():
        shutil.copytree(dist_assets, static_assets)

    for item in DIST.iterdir():
        if item.name in {"index.html", "assets"}:
            continue
        dest = STATIC / item.name
        if item.is_dir():
            if dest.exists():
                shutil.rmtree(dest)
            shutil.copytree(item, dest)
        else:
            shutil.copy2(item, dest)

    print(f"Copied {index} -> {TEMPLATES / 'index.html'}")
    print(f"Copied assets -> {static_assets}")


if __name__ == "__main__":
    main()
