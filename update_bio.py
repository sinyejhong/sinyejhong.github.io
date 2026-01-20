import re
import os

file_path = 'src/pages/about.astro'

print(f"Reading {file_path}...")
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add text-justify
print("Applying text-justify...")
old_class_part = 'text-gray-700 space-y-6'
new_class_part = 'text-gray-700 space-y-6 text-justify'

if old_class_part in content:
    if 'text-justify' not in content: # Avoid double add if partially applied
        content = content.replace(old_class_part, new_class_part)
        print("Address text-justify: APPLIED")
    else:
        print("Address text-justify: ALREADY PRESENT (Skipping)")
else:
    print("Address text-justify: TARGET NOT FOUND")
    # Debug print nearby
    idx = content.find('text-gray-700')
    if idx != -1:
        print(f"Context found: {content[idx:idx+50]}")

# 2. Highlight years
print("Highlighting years...")
start_marker = '<SectionHeader title="Biography" />'
# The education section starts with a comment or the section tag
end_marker = '<!-- Education -->'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx != -1 and end_idx != -1:
    bio_text = content[start_idx:end_idx]
    
    # Regex to find years 20xx that are NOT already wrapped in a span with text-blue-600
    # Negative lookbehind is hard because of variable attributes.
    # Easiest way: Find all 20xx and check context?
    # Or just replace all simple 20xx matches.
    
    # We want to replace "2024" with "<span class="text-blue-600 font-semibold">2024</span>"
    # But ONLY in this section.
    
    def replace_year(match):
        return f'<span class="text-blue-600 font-semibold">{match.group(1)}</span>'
        
    # \b(20[12]\d)\b matches 2010-2029 (approx). 
    # Current years: 2024, 2023, 2025, 2018, 2020, 2021, 2022
    new_bio_text = re.sub(r'\b(20[12]\d)\b', replace_year, bio_text)
    
    # Check if we messed up existing spans (e.g. if we ran it twice)
    # If we ran it twice, we'd have <span ...><span ...>2024</span></span>.
    # Note: The tool failed previously, so we assume clean state. 
    # But if we did partial apply, we might have issues.
    # To be safe, we can strip existing year spans first? 
    # nah, let's look at the file content we just read. It looked clean in view_file.
    
    if new_bio_text != bio_text:
        content = content[:start_idx] + new_bio_text + content[end_idx:]
        print("Years highlighting: APPLIED")
    else:
         print("Years highlighting: NO CHANGES (No years found or already done?)")

else:
    print("Could not find Biography section boundaries")

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
print("Done.")
