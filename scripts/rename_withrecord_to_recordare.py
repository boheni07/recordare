"""
Replace 'WithRecord/withrecord/위드레코드' with 'Recordare/레코다레' across the repo.
Case-preserving for English; literal swap for Korean.

Usage:
    python scripts/rename_withrecord_to_recordare.py
"""

from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

# Files to scan + replace content in (paths relative to ROOT)
TARGET_FILES = [
    "기획안.md",
    "docs/00-pm/withrecord-bi-proposal.md",
    "docs/00-pm/withrecord-prd-v2.md",
    "docs/00-pm/withrecord-ux-structure.md",
    "docs/00-pm/withrecord-workflows.md",
    "docs/00-pm/withrecord.prd.md",
    "docs/00-pm/recordare-bi-guide.md",
    "scripts/build_recordare_ux_review.py",
    ".bkit/audit/2026-05-24.jsonl",
]

# Renames (after content replacement is done)
RENAMES = [
    ("docs/00-pm/withrecord-bi-proposal.md", "docs/00-pm/recordare-bi-proposal.md"),
    ("docs/00-pm/withrecord-prd-v2.md",      "docs/00-pm/recordare-prd-v2.md"),
    ("docs/00-pm/withrecord-ux-structure.md","docs/00-pm/recordare-ux-structure.md"),
    ("docs/00-pm/withrecord-workflows.md",   "docs/00-pm/recordare-workflows.md"),
    ("docs/00-pm/withrecord.prd.md",         "docs/00-pm/recordare.prd.md"),
]


# Order matters: longest/most-specific first.
# Tuples: (search_regex_literal_or_pattern, replacement)
# Use case-sensitive matching to preserve casing.
REPLACEMENTS = [
    ("WITHRECORD", "RECORDARE"),
    ("WithRecord", "Recordare"),
    ("withRecord", "Recordare"),   # camelCase (rare)
    ("Withrecord", "Recordare"),   # safety
    ("withrecord", "Recordare"),
    ("위드레코드", "레코다레"),
]


def replace_text(s: str) -> tuple[str, int]:
    """Apply all replacements; return (new_text, total_replacements)."""
    total = 0
    for old, new in REPLACEMENTS:
        # Count occurrences first for reporting.
        count = s.count(old)
        if count:
            s = s.replace(old, new)
            total += count
    return s, total


def main() -> int:
    print(f"[1/3] Replacing content in {len(TARGET_FILES)} files...")
    grand_total = 0
    for rel in TARGET_FILES:
        p = ROOT / rel
        if not p.exists():
            print(f"  - SKIP (missing): {rel}")
            continue
        try:
            data = p.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            data = p.read_text(encoding="utf-8-sig")
        new_data, n = replace_text(data)
        if n:
            p.write_text(new_data, encoding="utf-8")
            print(f"  - {rel}  ({n} replacements)")
            grand_total += n
        else:
            print(f"  - {rel}  (no change)")
    print(f"  Total replacements: {grand_total}")

    print(f"\n[2/3] Renaming {len(RENAMES)} files...")
    for src, dst in RENAMES:
        sp = ROOT / src
        dp = ROOT / dst
        if not sp.exists():
            print(f"  - SKIP (missing): {src}")
            continue
        if dp.exists():
            print(f"  - SKIP (target exists): {dst}")
            continue
        sp.rename(dp)
        print(f"  - {src}  ->  {dst}")

    print("\n[3/3] Done.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
