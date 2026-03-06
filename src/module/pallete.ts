export const pallete = {
    name: "Glacier",
    description: "A mystical journey through frozen pastels and midnight ink.",
    colors: {
        zero: {
            base: "#13131C",
            surface: "#1A1A27",
            overlay: "#232333",
            muted: "#5B5B7E",
            subtle: "#8E8EAF",
            text: "#E0E0ED",

            cyanide: "#89DCEB",
            amber: "#F9E2AF",
            petal: "#F5C2E7",
            leaf: "#A6E3A1",
            lilac: "#CBA6F7",
            coral: "#F38BA8",

            highlightLow: "#1E1E2E",
            highlightMed: "#313244",
            highlightHigh: "#45475A",
        },
        mist: {
            base: "#1A1B26",
            surface: "#212334",
            overlay: "#2A2D42",
            muted: "#6B7095",
            subtle: "#A0A6C8",
            text: "#D8DBEE",

            cyanide: "#7BC6D9",
            amber: "#E6C98F",
            petal: "#E8B8DD",
            leaf: "#8FD3A3",
            lilac: "#B89AF3",
            coral: "#E79AAE",

            highlightLow: "#23263A",
            highlightMed: "#2C2F46",
            highlightHigh: "#35395A",
        },
        peak: {
            base: "#FFFFFF",
            surface: "#F2F4FA",
            overlay: "#E4E7F3",
            muted: "#686D98",
            subtle: "#3B3F66",
            text: "#10131F",

            cyanide: "#1FA9D6",
            amber: "#E0B044",
            petal: "#E36BD4",
            leaf: "#43C05A",
            lilac: "#8F5CFF",
            coral: "#E1486E",

            highlightLow: "#EEF1F8",
            highlightMed: "#DADFF0",
            highlightHigh: "#C6CCE2",
        },
    },
    roles: {
        base: {
            subtitle: "Primary background",
            description: "Main and accessory panels—**application frames**, **sidebars**, **tabs**, and extensions to the focal context.",
            tags: ["comments"],
        },
        surface: {
            subtitle: "Secondary background atop base",
            description: "Panels that are not directly related to the focal context—**cards**, **inputs**, and **status lines**.",
            tags: ["operators", "punctuation"],
        },
        overlay: {
            subtitle: "Tertiary background atop surface",
            description: "Panels that are more temporary in nature—**popovers**, **notifications**, and **dialogs**.",
            tags: ["variables"],
        },
        muted: {
            subtitle: "Low contrast foreground",
            description: "Ignored content—**disabled elements** and **unfocused text**.",
            tags: ["comments"],
        },
        subtle: {
            subtitle: "Medium contrast foreground",
            description: "Secondary content—**comments**, **punctuation**, and **tab names**.",
            tags: ["operators", "punctuation"],
        },
        text: {
            subtitle: "High contrast foreground",
            description: "Primary content—**normal text**, **variables**, and **active content**.",
            tags: ["variables"],
        },
        coral: {
            subtitle: "Per favore ama tutti",
            description: "**Diagnostic errors**, **Deleted Git files**, and **Terminal red, bright red**.",
            tags: ["builtins"],
        },
        amber: {
            subtitle: "Lemon tea on a summer morning",
            description: "**Diagnostic warnings** and **Terminal yellow, bright yellow**.",
            tags: ["strings"],
        },
        petal: {
            subtitle: "A beautiful yet cautious blossom",
            description: "**Matching search background** paired with base foreground, **Modified Git files**, and **Terminal cyan, bright cyan**.",
            tags: ["booleans", "functions"],
        },
        leaf: {
            subtitle: "Fresh winter greenery",
            description: "**Renamed Git files** and **Terminal green, bright green**.",
            tags: ["conditionals", "keywords"],
        },
        cyanide: {
            subtitle: "Saltwater tidepools",
            description: "**Diagnostic information**, **Git additions**, and **Terminal blue, bright blue**.",
            tags: ["keys", "tags", "types"],
        },
        lilac: {
            subtitle: "Smells of groundedness",
            description: "**Diagnostic hints**, **Inline links**, **Merged and staged Git modifications**, and **Terminal magenta, bright magenta**.",
            tags: ["methods", "parameters"],
        },
        highlightLow: {
            subtitle: "Low contrast highlight",
            description: "Low contrast highlight for **background elements**.",
            tags: ["comments"],
        },
        highlightMed: {
            subtitle: "Medium contrast highlight",
            description: "Medium contrast highlight for **background elements**.",
            tags: ["comments"],
        },
        highlightHigh: {
            subtitle: "High contrast highlight",
            description: "High contrast highlight for **background elements**.",
            tags: ["comments"],
        },
    },
} as const;