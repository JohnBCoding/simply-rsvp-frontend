module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        colors: {
            background: "#08141e",
            primary: "#c3a38a",
            secondary: "#f6d6bd",
            info: "#4e495f",
            warning: "#997577",
            transparent: "transparent",
        },
        extend: {
            zIndex: {
                "-1": "-1",
            },
            transformOrigin: {
                0: "0%",
            },
        },
    },
    variants: {
        extend: {
            borderStyle: ["responsive", "hover"],
            borderWidth: ["responsive", "hover"],
            height: ["hover", "focus"],
        },
    },
    plugins: [],
};
