#!/bin/bash
set -e

# リリースタイプを引数から取得（デフォルト: patch）
RELEASE_TYPE=${1:-patch}

# 現在のブランチがmainであることを確認
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "Error: 現在のブランチがmainではありません (current: $CURRENT_BRANCH)"
  echo "mainブランチに切り替えてから実行してください"
  exit 1
fi

# mainブランチが最新であることを確認
echo "📥 mainブランチを最新に更新中..."
git pull origin main

# 現在のバージョンを取得
CURRENT_VERSION=$(node -p "require('./package.json').version")
echo "📌 現在のバージョン: v$CURRENT_VERSION"

# 次のバージョンを計算（簡易版）
IFS='.' read -r -a VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR="${VERSION_PARTS[0]}"
MINOR="${VERSION_PARTS[1]}"
PATCH="${VERSION_PARTS[2]}"

case $RELEASE_TYPE in
  major)
    NEXT_VERSION="$((MAJOR + 1)).0.0"
    ;;
  minor)
    NEXT_VERSION="$MAJOR.$((MINOR + 1)).0"
    ;;
  patch)
    NEXT_VERSION="$MAJOR.$MINOR.$((PATCH + 1))"
    ;;
  *)
    echo "Error: 無効なリリースタイプ: $RELEASE_TYPE"
    echo "使用可能: patch, minor, major"
    exit 1
    ;;
esac

RELEASE_BRANCH="release/v$NEXT_VERSION"
echo "🌿 リリースブランチ: $RELEASE_BRANCH"
echo "🚀 次のバージョン: v$NEXT_VERSION"

# リリースブランチを作成
echo ""
echo "📦 リリースブランチを作成中..."
git checkout -b "$RELEASE_BRANCH"

# changelogenを実行
echo ""
echo "📝 changelogenを実行中..."
pnpm run "release:$RELEASE_TYPE"

# 変更をコミット
echo ""
echo "💾 変更をコミット中..."
git add .
git commit -m "chore(release): v$NEXT_VERSION

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# リモートにプッシュ
echo ""
echo "☁️  リモートにプッシュ中..."
git push -u origin "$RELEASE_BRANCH"

# PRを作成
echo ""
echo "🔀 PRを作成中..."
gh pr create --title "chore(release): v$NEXT_VERSION" --body "$(cat <<EOF
## Summary
Release v$NEXT_VERSION

## Changes
- Bump version to v$NEXT_VERSION
- Update CHANGELOG.md

## Checklist
- [ ] CHANGELOG.md が正しく更新されている
- [ ] package.json のバージョンが正しく更新されている
- [ ] ビルドが成功する
- [ ] ドキュメントが正しくビルドされる

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"

echo ""
echo "✅ リリースフローが完了しました！"
echo "📍 PR: $(gh pr view --json url -q .url)"
echo ""
echo "次のステップ:"
echo "1. PRをレビュー"
echo "2. PRをマージ"
echo "3. タグをプッシュ（必要に応じて）"
