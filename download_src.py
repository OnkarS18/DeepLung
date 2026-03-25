import urllib.request
import json
import os
import re
from urllib.parse import urljoin

base_url = "https://readdy.link/preview/188c2ead-1ef0-4ef1-b560-4b6154127598/2638630"

print("Fetching html...")
html = urllib.request.urlopen(base_url).read().decode('utf-8')

# Find the javascript bundle URL
js_pattern = re.search(r'src="(/preview/188c2ead-1ef0-4ef1-b560-4b6154127598/2638630/assets/index-[^\"]+\.js)"', html)
if not js_pattern:
    print("Could not find JS bundle in HTML.")
    print("HTML:", html)
    exit(1)

js_url = urljoin("https://readdy.link/", js_pattern.group(1))
print("Found JS URL:", js_url)

print("Fetching JS bundle...")
js_content = urllib.request.urlopen(js_url).read().decode('utf-8')

# Find source map url
source_map_pattern = re.search(r'//# sourceMappingURL=(.*\.js\.map)', js_content)
if not source_map_pattern:
    print("Could not find source map URL in JS bundle.")
    exit(1)

source_map_url = urljoin(js_url, source_map_pattern.group(1))
print("Found Source Map URL:", source_map_url)

print("Fetching Source Map...")
try:
    source_map_content = urllib.request.urlopen(source_map_url).read().decode('utf-8')
except Exception as e:
    print(f"Failed to fetch source map: {e}")
    exit(1)

print("Parsing Source Map...")
data = json.loads(source_map_content)

sources = data.get("sources", [])
sourcesContent = data.get("sourcesContent", [])

print(f"Found {len(sources)} sources.")

output_dir = "downloaded_src"
os.makedirs(output_dir, exist_ok=True)

for i, source_path in enumerate(sources):
    content = sourcesContent[i] if i < len(sourcesContent) else None
    if not content:
        continue
    
    # Clean up source path
    # Typically looks like "../../src/main.tsx" or "webpack:///src/main.tsx"
    clean_path = source_path
    if clean_path.startswith("../"):
        clean_path = clean_path.lstrip("../")
    if clean_path.startswith("./"):
        clean_path = clean_path.lstrip("./")
    # if it doesn't have src/, maybe just write using original path logic
    # The user specifically asked for "src folder as it is".
    # Source map paths often are `../../src/main.tsx` relative to `assets/` so it will be `src/main.tsx`
    
    if "node_modules" in clean_path:
        continue

    # Remove protocol if any
    clean_path = re.sub(r'^webpack://[^/]+/', '', clean_path)
    # Removing any leading slashes
    clean_path = clean_path.lstrip('/')
    
    full_path = os.path.join(output_dir, clean_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)
        
print("Source downloading complete! Check downloaded_src folder.")
