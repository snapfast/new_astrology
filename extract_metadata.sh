#!/bin/bash
echo "=== METADATA ==="
for file in $(find src/app -name "page.tsx" -o -name "layout.tsx"); do
  echo "--- $file ---"
  grep -E "(title:|description:)" "$file" | head -n 4
done
echo "=== TRANSLATIONS ==="
for file in $(find src/app -name "*.tsx" -o -name "*.ts"); do
  if grep -q "TRANSLATIONS =" "$file"; then
    echo "--- $file ---"
    grep -A 4 "TRANSLATIONS =" "$file"
  fi
done
