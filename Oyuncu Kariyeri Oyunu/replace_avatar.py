import re

with open("game.js", "r", encoding="utf-8") as f:
    text = f.read()

# Define the replacement text
replacement = """    generateAvatar: function(age) {
        // Obsolete, we use HD PNGs now. Keep for backward compatibility if called somewhere else.
        const avatarUrl = this.state.avatarImage || "avatars/avatar_1.png";
        return `<img src="${avatarUrl}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    },"""

# Regex to find generateAvatar and replace it
# It starts with "generateAvatar: function" and ends before the next function or the end of GAME object "generateSeasonFixtures:"
pattern = r"generateAvatar:\s*function\(age\)\s*\{.*?return\s*`<svg[^>]*>.*?<\/svg>`;\n\s*\},\n"

new_text = re.sub(pattern, replacement + "\n", text, flags=re.DOTALL)

with open("game.js", "w", encoding="utf-8") as f:
    f.write(new_text)

print("Done. Text length before:", len(text), "after:", len(new_text))
