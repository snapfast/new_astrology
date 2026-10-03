import os, re

routes = set()
for root, dirs, files in os.walk('src/app'):
    for f in files:
        if f in ['page.tsx', 'route.ts']:
            rel = os.path.relpath(root, 'src/app')
            if rel == '.':
                routes.add('/')
            else:
                routes.add('/' + rel.replace('\\', '/'))

for f in os.listdir('src/content/blog'):
    if f.endswith('.md'):
        routes.add(f'/blog/{f[:-3]}')

href_regex = re.compile(r'href=["\'`]([^"\'`]+)["\'`]')

all_links = []

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            path = os.path.join(root, file)
            with open(path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
                for idx, line in enumerate(lines, 1):
                    for match in href_regex.finditer(line):
                        val = match.group(1)
                        # Extract surrounding text/element context
                        start = max(0, idx - 2)
                        end = min(len(lines), idx + 2)
                        context = "".join(lines[start:end]).strip()
                        all_links.append((path, idx, val, line.strip()))

for path, line_no, val, snippet in sorted(all_links, key=lambda x: x[0]):
    print(f"{path}:{line_no} | href='{val}'\n  Snippet: {snippet}\n")
