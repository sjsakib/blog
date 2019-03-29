import Typography from "typography"

const typography = new Typography({
  baseFontSize: "16px",
  baseLineHeight: 1.65,
  headerFontFamily: [
    "Quando",
    "Helvetica Neue",
    "Segoe UI",
    "Helvetica",
    "Arial",
    "sans-serif",
  ],
  bodyFontFamily: ["Noticia Text", "serif"],
  googleFonts: [
    { name: `Quando`, styles: ["700"] },
    { name: `Noticia Text`, styles: ["700"] },
  ],
})

export default typography
