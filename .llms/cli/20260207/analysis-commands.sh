#!/bin/bash
# CLI commands used during project analysis
# Session: PROMPT-CREATOR-APP-1
# Date: 2026-02-07

# Create directory structure
mkdir -p .llms/notes/{non-structured,structured}/20260207 .llms/cli/20260207

# Search for TODO/FIXME comments
grep -rn "TODO\|FIXME\|BUG\|HACK\|XXX" src/ --include="*.ts" --include="*.tsx"

# Find all 'any' type usage
grep -rn "any" src/ --include="*.ts" --include="*.tsx" | wc -l

# Find disabled ESLint rules
grep -rn "eslint-disable\|@ts-ignore\|@ts-expect-error" src/ --include="*.ts" --include="*.tsx"

# Count form components
find src/components/forms -name "*Form*.tsx" | wc -l

# List all form files with paths
find src/components/forms -name "*Form*.tsx" -type f

# Find console.log statements
grep -rn "console\.log" src/ --include="*.ts" --include="*.tsx"

# Count total TypeScript files
find src/ -name "*.ts" -o -name "*.tsx" | wc -l

# Search for commented code
grep -rn "^[ ]*//.*import\|^[ ]*//.*export\|^[ ]*//.*const\|^[ ]*//.*function" src/ --include="*.ts" --include="*.tsx"

# Find files with long functions (>200 lines)
# (Manual inspection needed)
for file in $(find src -name "*.tsx"); do
  echo "$file: $(wc -l < "$file") lines"
done | sort -t: -k2 -rn | head -20

# Check TypeScript compilation
# npm run build

# Run linter
# npm run lint

# Search for specific patterns
grep -rn "DeepOptional" src/ --include="*.tsx" | wc -l
grep -rn "useOptFormCtx" src/ --include="*.tsx" | wc -l
grep -rn "ErrorBoundary" src/ --include="*.tsx" | wc -l

