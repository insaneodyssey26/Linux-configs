# ~ / .config/fish/config.fish

set -g fish_greeting ""

# 1. Startup Visuals (Your custom fastfetch)
if status is-interactive
    fastfetch --config small.jsonc
end

# 2. Modern Aliases (Using 'abbr' so they expand as you type!)
abbr -a ls 'eza --icons --group-directories-first'
abbr -a ll 'eza -la --icons --group-directories-first --git'
abbr -a tree 'eza --tree --icons'
abbr -a cat 'bat'
abbr -a afetch 'fastfetch --config small.jsonc'
abbr -a grep 'grep --color=auto'

# 3. Zoxide & Starship Initialization
zoxide init fish | source
starship init fish | source

# 4. FZF (Fish has its own keybindings built-in)
fzf --fish | source

# 5. The 'nn' Universal Note Function
function nn
    # Set default name to 'note' if no argument provided
    set -l name (test -n "$argv[1]"; and echo "$argv[1]"; or echo "note")
    set -l filename "$name.rnote"

    # Copy template and open in background
    if test -f ~/Templates/Template.rnote
        cp ~/Templates/Template.rnote "./$filename"
        rnote "./$filename" &
        disown # Allows closing terminal without closing Rnote
    else
        echo "Error: Template.rnote not found in ~/Templates/"
    end
end

# 6. Global Variable for 'cd' -> 'z' behavior
alias cd='z'

# Make Tab accept the ghost text if it's there
bind \t accept-autosuggestion
bind ctrl-h backward-kill-word
