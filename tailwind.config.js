module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#EDE9E0",
        ink: "#141210",
        brick: "#E63916",
        ash: "#9A9488",
      },
      fontFamily: {
        sans: [
          "Archivo",
          "sans-serif",
        ],
        mono: [
          '"Space Mono"',
          "monospace",
        ],
      },
    },
  },
  plugins: [],
}
