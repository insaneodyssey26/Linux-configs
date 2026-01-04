# Linux Configs

This repository contains my personal Linux configuration files (dotfiles) for setting up a customized development environment.

**[View the Showcase Website](index.html)** - A minimal website showcasing the configs and their functions.

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

### Core Dependencies
- **Bash** (for setup script)
- **Fish shell** (main shell configuration)
- **dconf** (for GNOME settings)
- **VSCode Insiders** (for editor configuration)

### Fish Shell Tools (Required for aliases to work)
- **[eza](https://github.com/eza-community/eza)** - Modern replacement for `ls` with icons and colors
- **[bat](https://github.com/sharkdp/bat)** - Modern replacement for `cat` with syntax highlighting
- **[fastfetch](https://github.com/fastfetch-cli/fastfetch)** - System information display tool
- **[zoxide](https://github.com/ajeetdsouza/zoxide)** - Smart directory jumping (replaces `cd`)
- **[starship](https://starship.rs/)** - Cross-shell prompt customization
- **[fzf](https://github.com/junegunn/fzf)** - Fuzzy finder for command-line
- **[rnote](https://github.com/flxzt/rnote)** - Note-taking application (for `nn` function)

### Installation Commands (Arch Linux)
```bash
# Install core tools
sudo pacman -S fish dconf code-insiders

# Install Fish shell dependencies
sudo pacman -S eza bat fastfetch zoxide starship fzf rnote

# Initialize tools
zoxide init fish | source
starship init fish | source
fzf --fish | source
```

### Optional Dependencies
- **GNOME Shell** (for desktop settings and extensions)
- **Pacman** (for automated package installation in setup script)

Restart your terminal or log out/in after running the setup script to see all changes.