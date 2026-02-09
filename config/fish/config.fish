set -g fish_greeting ""

if status is-interactive
    fastfetch --logo-type small --structure Title:Separator:OS:Kernel:Uptime:Shell:Packages
end

abbr -a ls 'eza --icons --group-directories-first'
abbr -a ll 'eza -la --icons --group-directories-first --git'
abbr -a tree 'eza --tree --icons'
abbr -a cat 'bat'
abbr -a afetch 'fastfetch --logo-type small --structure Title:Separator:OS:Kernel:Uptime:Shell:Packages'
abbr -a grep 'grep --color=auto'

zoxide init fish | source
starship init fish | source

fzf --fish | source

function nn
    set -l name (test -n "$argv[1]"; and echo "$argv[1]"; or echo "note")
    set -l filename "$name.rnote"

    if test -f ~/Templates/Template.rnote
        cp ~/Templates/Template.rnote "./$filename"
        rnote "./$filename" &
        disown 
    else
        echo "Error: Template.rnote not found in ~/Templates/"
    end
end

alias cd='z'

bind \t accept-autosuggestion
bind ctrl-h backward-kill-word
