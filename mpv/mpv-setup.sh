echo "Starting MPV Setup..."

# 1. INSTALL PACKAGES
echo "Installing core packages and UI components..."
sudo pacman -S --needed mpv inter-font wget
paru -S --needed mpv-uosc mpv-thumbfast-git

# 2. CREATE DIRECTORY STRUCTURE
echo "Creating folder structure..."
mkdir -p ~/.config/mpv/shaders ~/.config/mpv/scripts ~/.config/mpv/script-opts ~/.config/mpv/fonts

# 3. DOWNLOAD SHADERS (ArtCNN)
echo "Downloading Neural Network shaders..."
wget -q --show-progress -O ~/.config/mpv/shaders/ArtCNN_C4F16.glsl \
    https://github.com/Artoriuz/ArtCNN/releases/latest/download/ArtCNN_C4F16.glsl

# 4. CREATE CONFIGS (Using 'cat' to write the files directly)
echo "Writing mpv.conf (NVIDIA Wayland Stable)..."
cat <<EOF > ~/.config/mpv/mpv.conf
# CORE STABILITY
wayland-internal-vsync=yes
vo=gpu-next
gpu-api=opengl
hwdec=nvdec
save-position-on-quit=yes

# AESTHETICS
no-border
autofit-larger=90%x90%
cursor-autohide=500
osc=no
osd-bar=no

# MOTION & QUALITY
video-sync=display-resample
interpolation=yes
tscale=oversample
glsl-shaders="~/.config/mpv/shaders/ArtCNN_C4F16.glsl"
EOF

echo "Writing input.conf (VLC-Style Keyboard Shortcuts)..."
cat <<EOF > ~/.config/mpv/input.conf
# VOLUME
UP    add volume 2
DOWN  add volume -2
m     cycle mute

# CORE PLAYBACK
SPACE cycle pause
f     cycle fullscreen
ESC   set fullscreen no
s     stop
n     playlist-next
p     playlist-prev

# TIERED SEEKING
RIGHT       seek  5
LEFT        seek -5
SHIFT+RIGHT seek  3
SHIFT+LEFT  seek -3
ALT+RIGHT   seek  10
ALT+LEFT    seek -10
CTRL+RIGHT  seek  60
CTRL+LEFT   seek -60
CTRL+ALT+RIGHT seek 300
CTRL+ALT+LEFT  seek -300

# EXTRAS
v cycle sub
b cycle audio
S screenshot
EOF

echo "Writing uosc.conf (Island Aesthetic)..."
cat <<EOF > ~/.config/mpv/script-opts/uosc.conf
color=foreground=ffffff,background=000000,selection=3d5afe
opacity=0.8
thumbnails=yes
top_bar=on_hover
EOF

# 5. LINK UI SCRIPTS & FONTS
echo "Linking uosc UI elements..."
ln -sf /usr/share/mpv/scripts/uosc ~/.config/mpv/scripts/
ln -sf /usr/share/mpv/fonts/uosc_icons.otf ~/.config/mpv/fonts/
ln -sf /usr/share/mpv/fonts/uosc_textures.ttf ~/.config/mpv/fonts/

echo "✅ SETUP COMPLETE! Launch MPV and enjoy the premium look."