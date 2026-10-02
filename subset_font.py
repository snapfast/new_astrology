import os
import re
from fontTools.ttLib import TTFont
from fontTools.subset import Subsetter, Options

def find_required_icons():
    """
    Scans the src/ directory for Material Symbols icon names used across JSX/TSX files
    and combines them with known icon name lists.
    """
    src_dir = "src"
    icons = set()

    # Explicitly known icons used across application features
    known_icons = {
        "account_tree", "adjust", "alternate_email", "arrow_back", "arrow_forward", "arrow_upward",
        "auto_awesome", "auto_stories", "bedtime", "block", "calendar_month", "calendar_today",
        "cancel", "chat_bubble", "check", "check_circle", "chevron_left", "chevron_right", "close",
        "content_copy", "dashboard", "desktop_windows", "done", "edit", "edit_note", "event",
        "explore", "favorite", "festival", "fitness_center", "flight", "folder_open",
        "format_list_numbered", "grid_view", "help_center", "history", "hourglass_empty", "info",
        "insights", "lightbulb", "local_fire_department", "mail", "menu", "menu_book", "nights_stay",
        "open_in_new", "palette", "person", "psychology", "schedule", "school", "search",
        "search_off", "self_improvement", "sentiment_satisfied", "share", "star", "sunny",
        "sync_alt", "table_chart", "task_alt", "view_quilt", "visibility", "warning",
        "wb_sunny", "wb_twilight", "wc"
    }
    icons.update(known_icons)

    for root, dirs, files in os.walk(src_dir):
        for f in files:
            if f.endswith((".ts", ".tsx", ".js", ".jsx")):
                path = os.path.join(root, f)
                with open(path, "r", encoding="utf-8") as fp:
                    content = fp.read()
                    matches = re.findall(r"material-symbols-outlined[^>]*>\s*([a-z0-9_]+)\s*</", content)
                    for m in matches:
                        icons.add(m)

    return sorted(list(icons))

def subset_font():
    """
    Subsets material-symbols-outlined.woff2 by retaining only the GSUB ligatures
    and character unicodes for required icons, drastically reducing font download size.
    """
    icons_list = find_required_icons()
    font_path = "src/fonts/material-symbols-outlined.woff2"
    font = TTFont(font_path)

    cmap = font.getBestCmap()
    char_map = {}
    for code, name in cmap.items():
        if code <= 0x7E:
            char_map[name] = chr(code)
    char_map["underscore"] = "_"
    char_map["hyphen"] = "-"
    char_map["minus"] = "-"
    char_map["period"] = "."
    char_map["digit_zero"] = "0"
    char_map["digit_one"] = "1"
    char_map["digit_two"] = "2"
    char_map["digit_three"] = "3"
    char_map["digit_four"] = "4"
    char_map["digit_five"] = "5"
    char_map["digit_six"] = "6"
    char_map["digit_seven"] = "7"
    char_map["digit_eight"] = "8"
    char_map["digit_nine"] = "9"

    gsub = font["GSUB"]
    kept_ligatures_count = 0
    total_ligatures_count = 0

    for lookup in gsub.table.LookupList.Lookup:
        for st in lookup.SubTable:
            actual_st = getattr(st, "ExtSubTable", st)
            if hasattr(actual_st, "ligatures"):
                new_ligatures = {}
                for first_glyph, lig_list in actual_st.ligatures.items():
                    first_char = char_map.get(first_glyph, "")
                    filtered_lig_list = []
                    for lig in lig_list:
                        total_ligatures_count += 1
                        comp_chars = [char_map.get(c, "") for c in lig.Component]
                        full_str = first_char + "".join(comp_chars)
                        if full_str in icons_list:
                            filtered_lig_list.append(lig)
                            kept_ligatures_count += 1
                    if filtered_lig_list:
                        new_ligatures[first_glyph] = filtered_lig_list
                actual_st.ligatures = new_ligatures

    print(f"Pruned GSUB ligatures from {total_ligatures_count} down to {kept_ligatures_count}.")

    unicodes = set()
    for c in set("".join(icons_list)):
        unicodes.add(ord(c))

    options = Options()
    options.flavor = "woff2"
    options.layout_features = ["*"]

    subsetter = Subsetter(options=options)
    subsetter.populate(unicodes=unicodes)
    subsetter.subset(font)

    font.save(font_path)
    size_kb = os.path.getsize(font_path) / 1024
    print(f"Subsetting complete! New font size: {size_kb:.2f} KB")

if __name__ == "__main__":
    subset_font()
