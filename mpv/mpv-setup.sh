#!/bin/bash

# --- MPV Master Reinstall Script for Asus TUF A15 (2026 Edition) ---
# Optimized for: Ryzen 7 7435HS + RTX 4050 + Adwaita Sans

echo "Starting MPV Setup..."

# 1. Install System Packages
echo "Installing system packages..."
sudo pacman -S --needed mpv libva-nvidia-driver unzip wget git ttf-adwaita-sans \
    ffmpegthumbnailer gst-libav gst-plugins-good gst-plugins-bad gst-plugins-ugly

# 2. Cleanup and Setup Folders
echo "Preparing directories..."
rm -rf ~/.config/mpv/scripts/uosc
mkdir -p ~/.config/mpv/scripts ~/.config/mpv/fonts ~/.config/mpv/script-opts

# 3. Install uosc (The UI)
echo "Installing uosc (UI)..."
wget -q --show-progress https://github.com/tomasklaen/uosc/releases/latest/download/uosc.zip
unzip -qo uosc.zip -d ~/.config/mpv/
rm uosc.zip

# 4. Install thumbfast (Timeline Thumbnails)
echo "Installing thumbfast..."
wget -P ~/.config/mpv/scripts/ https://raw.githubusercontent.com/po5/thumbfast/master/thumbfast.lua

# 5. Install mpv-cut (Video Cutting Tool)
echo "Installing mpv-cut..."
git clone -b release --single-branch "https://github.com/familyfriendlymikey/mpv-cut.git" ~/.config/mpv/scripts/mpv-cut

# 6. Write mpv.conf (Performance & Hardware Acceleration)
echo "Writing mpv.conf..."
cat <<EOF > ~/.config/mpv/mpv.conf
# --- UI & Aesthetics ---
osc=no
border=no
osd-bar=no
cursor-autohide=1000
osd-font='Adwaita Sans'
osd-font-size=30

# --- Hardware Acceleration (NVIDIA + Wayland) ---
vo=gpu
gpu-api=vulkan
hwdec=auto-safe
profile=gpu-hq
video-sync=display-resample

# --- High-End Scaling ---
scale=ewa_lanczossharp
cscale=ewa_lanczossharp

# --- Behavior ---
save-position-on-quit=yes
keep-open=yes
config=yes
EOF

# 7. Write input.conf (Keybindings)
echo "Writing input.conf..."
cat <<EOF > ~/.config/mpv/input.conf
# --- UOSC Controls ---
mbtn_right  script-binding uosc/menu
s           script-binding uosc/subtitles
a           script-binding uosc/audio
o           script-binding uosc/open-file
p           script-binding uosc/items

# --- Basic Navigation ---
SPACE       cycle pause
RIGHT       seek  5
LEFT        seek -5
UP          add volume  5
DOWN        add volume -5

# --- The Cut Feature ---
c           script-binding mpv_cut/start-stop-cut
EOF

# 8. Write uosc.conf (UI Styling)
echo "🖌️ Writing script-opts/uosc.conf..."
cat <<EOF > ~/.config/mpv/script-opts/uosc.conf
# --- The Layout Fix ---
ui_scale=0.7
font_scale=0.8
font_bold=Adwaita Sans Semibold

# --- Spacing ---
timeline_size=32
controls_size=38
menu_item_height=36
menu_min_width=260

# --- Appearance (Signature Blue #3b82f6) ---
color=foreground=3b82f6,background=000000,text=ffffff
EOF

# 9. Final Touches
echo "Refreshing font cache..."
fc-cache -fv

echo "DONE! MPV is now installed."
