export const ports = {
    description: "Glacier is in building.",
    categories: {
        music: [
            {
                name: "Cava",
                icon: "music" as const,
                repo: "https://github.com/hyperreal/cava"
            }
        ],
        app: [
            {
                name: "tmux",
                icon: "app" as const,
                repo: "https://github.com/tmux/tmux"
            },
            {
                name: "Wofi",
                icon: "app" as const,
                repo: "https://github.com/davatorium/rofi"
            },
            {
                name: "Rofi",
                icon: "app" as const,
                repo: "https://github.com/davatorium/rofi"
            }
        ],
        terminal: [
            {
                name: "Foot",
                icon: "terminal" as const,
                repo: "https://github.com/kuzanf3b/foot"
            },
            {
                name: "Ghostty",
                icon: "terminal" as const,
                repo: "https://github.com/kuzanf3b/ghostty"
            },
            {
                name: "Alacritty",
                icon: "terminal" as const,
                repo: "https://github.com/alacritty/alacritty"
            },
            {
                name: "Kitty",
                icon: "terminal" as const,
                repo: "https://github.com/kovidgoyal/kitty"
            }
        ]
    }
} as const
