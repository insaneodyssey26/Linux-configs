#!/bin/bash

YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' 

echo -e "${YELLOW}Starting Dotfiles Restoration...${NC}"

echo "Creating config directories..."
mkdir -p ~/.config/fish
mkdir -p ~/.config/fastfetch
mkdir -p ~/.config/rnote
mkdir -p "~/.config/Code - Insiders/User"

echo "Linking configuration files..."

ln -sf ~/dotfiles/config/fish/config.fish ~/.config/fish/config.fish
ln -sf ~/dotfiles/config/starship.toml ~/.config/starship.toml
ln -sf ~/dotfiles/bashrc ~/.bashrc
ln -sf ~/dotfiles/vscode_settings.json "~/.config/Code - Insiders/User/settings.json"
ln -sf ~/dotfiles/vscode_keybindings.json "~/.config/Code - Insiders/User/keybindings.json"

if [ -f ~/dotfiles/packages.txt ]; then
    read -p "Do you want to install missing packages from packages.txt? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Installing packages..."
        sudo pacman -S --needed - < ~/dotfiles/packages.txt
    fi
fi

if [ -f ~/dotfiles/vscode_extensions.txt ]; then
    echo "Installing VS Code Insiders extensions..."
    cat ~/dotfiles/vscode_extensions.txt | xargs -L 1 code-insiders --install-extension
fi

if [ -f ~/dotfiles/gnome_settings.ini ]; then
    echo "Applying GNOME system settings (dconf)..."
    dconf load / < ~/dotfiles/gnome_settings.ini
fi

if [ -d ~/dotfiles/Gnome/Extensions/extensions_backup ]; then
    echo "Restoring GNOME extensions from backup..."
    mkdir -p ~/.local/share/gnome-shell/extensions
    cp -r ~/dotfiles/Gnome/Extensions/extensions_backup/* ~/.local/share/gnome-shell/extensions/
fi

echo -e "${GREEN}All done! Please restart your terminal or log out/in to see changes.${NC}"