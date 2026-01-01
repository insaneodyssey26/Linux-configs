fastfetch --logo-type small --structure Title:Separator:OS:Kernel:Uptime:Shell:Packages

[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'

alias afetch='fastfetch --logo-type small --structure Title:Separator:OS:Kernel:Uptime:Shell:Packages' 


alias ls='eza --icons --group-directories-first'
alias ll='eza -la --icons --group-directories-first --git'
alias tree='eza --tree --icons'

alias cat='bat'

eval "$(zoxide init bash)"
alias cd='z' 

eval "$(fzf --bash)"


nn() {
    local name="${1:-note}"
    local filename="${name}.rnote"
    
    cp ~/Templates/Template.rnote "./$filename"
    
    rnote "./$filename" &
}

eval "$(starship init bash)"

PS1='[\u@\h \W]\$ '
