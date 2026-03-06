export const ports = {
    description: "Glacier is in building.",
    categories: {
        editor: [
            {
                name: "Neovim",
                icon: "editor" as const,
                repo: "https://github.com/neovim/neovim"
            },
        ],
        terminal: [
            {
                name: "Windows Terminal",
                icon: "terminal" as const,
                repo: "https://github.com/microsoft/terminal"
            },
        ]
    }
} as const
