# Linux Configs

This repository contains my personal Linux configuration files (dotfiles) for setting up a customized development environment.

## Quick Setup

1. Clone this repo to `~/dotfiles`:
   ```bash
   git clone <your-repo-url> ~/dotfiles
   ```

2. Run the setup script:
   ```bash
   ~/dotfiles/setup/setup.sh
   ```

The script will:
- Create necessary config directories
- Symlink configuration files to their proper locations
- Optionally install packages and VSCode extensions
- Apply GNOME settings
- Restore GNOME extensions from backup

## What's Included

- **Fish Shell**: Config with useful aliases, zoxide/starship/fzf integrations, and a note-taking function
- **Fastfetch**: System info display configuration
- **GNOME**: Desktop settings ([Gnome/gnome_settings.ini](Gnome/gnome_settings.ini)) and extensions list ([Gnome/Extensions/extensions.txt](Gnome/Extensions/extensions.txt)) with backup files ([Gnome/Extensions/extensions_backup/](Gnome/Extensions/extensions_backup/))
- **VSCode Insiders**: Settings and extensions list
- **Setup Script**: Automated restoration script

## Requirements

- Bash
- Fish shell
- dconf (for GNOME)
- VSCode Insiders
- Pacman (for package installation on Arch-based systems)

Restart your terminal or log out/in after running the setup script to see all changes.