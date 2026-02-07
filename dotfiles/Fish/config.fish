set -g fish_greeting ""

# 1. Startup Visuals
if status is-interactive
    # Uses default config if small.jsonc is missing
    fastfetch 
end

# 2. Modern Aliases (Using 'abbr' so they expand as you type!)
abbr -a ls 'eza --icons --group-directories-first'
abbr -a ll 'eza -la --icons --group-directories-first --git'
abbr -a tree 'eza --tree --icons'
abbr -a cat 'bat'
abbr -a afetch 'fastfetch'
abbr -a grep 'grep --color=auto'

# 3. Zoxide & Starship Initialization
zoxide init fish | source
starship init fish | source

# 4. FZF (Fish has its own keybindings built-in)
fzf --fish | source

# 5. Global Variable for 'cd' -> 'z' behavior
alias cd='z'

# Keybindings
bind \t accept-autosuggestion
bind ctrl-h backward-kill-word
