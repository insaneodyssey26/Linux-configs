# Linux Configs

This repository contains my personal Linux configuration files (dotfiles) for setting up a customized development environment with Fish shell, Ghostty/Kitty terminals, Starship prompt, and Fastfetch system info.

**[View the Showcase Website](index.html)** - A minimal website showcasing the configs and their functions.

## ⚠️ WARNING: Setup Script Incomplete

**The automated setup script (`setup/setup.sh`) is currently not properly configured and may cause issues or incomplete setups. Do not run it yet!** 

Manual setup is recommended for now. Follow the individual configuration steps below.

## Manual Setup

1. Clone this repo to `~/dotfiles`:
   ```bash
   git clone <your-repo-url> ~/dotfiles
   ```

2. Manually symlink or copy configuration files to their proper locations (see "What's Included" for details).

3. Install required tools and apply settings as described in Requirements.

<!-- Commented out until setup.sh is fixed
## Quick Setup (DISABLED)

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
-->

## What's Included

- **Fish Shell**: Config with useful aliases and zoxide/starship/fzf integrations
- **Ghostty Terminal**: AMOLED-optimized terminal with transparency and custom palette
- **Kitty Terminal**: GPU-accelerated terminal with custom tab bar and cursor trail
- **Starship Prompt**: Powerline-style prompt with Gruvbox colors and git status
- **Fastfetch**: System info display configurations (full and compact versions)
- **Setup Script**: Automated restoration script (currently disabled)

## Requirements

### Core Dependencies
- **Bash** (for setup script)
- **Fish shell** (main shell configuration)
- **dconf** (for GNOME settings - if using GNOME)

### Fish Shell Tools (Required for aliases to work)
- **[eza](https://github.com/eza-community/eza)** - Modern replacement for `ls` with icons and colors
- **[bat](https://github.com/sharkdp/bat)** - Modern replacement for `cat` with syntax highlighting
- **[fastfetch](https://github.com/fastfetch-cli/fastfetch)** - System information display tool
- **[zoxide](https://github.com/ajeetdsouza/zoxide)** - Smart directory jumping (replaces `cd`)
- **[starship](https://starship.rs/)** - Cross-shell prompt customization
- **[fzf](https://github.com/junegunn/fzf)** - Fuzzy finder for command-line

### Installation Commands (Arch Linux)
```bash
# Install core tools
sudo pacman -S fish dconf

# Install Fish shell dependencies
sudo pacman -S eza bat fastfetch zoxide starship fzf

# Initialize tools
zoxide init fish | source
starship init fish | source
fzf --fish | source
```

### Optional Dependencies
- **GNOME Shell** (for desktop settings and extensions)
- **Pacman** (for automated package installation in setup script)

Restart your terminal or log out/in after running the setup script to see all changes.