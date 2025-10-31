import "./globals.css";
import Header from "../components/Header";


export const metadata = {
  title: "Blog de SherpApp",
  description: "Aprendizajes, avances y reflexiones del equipo SherpApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        style={{
          margin: 0,
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#fafafa",
          color: "#222",
        }}
      >
        <Header />
        <main style={{ minHeight: "80vh", padding: "2rem" }}>{children}</main>
        <footer
          style={{
            textAlign: "center",
            padding: "1rem 0",
            borderTop: "1px solid #eee",
            fontSize: "0.9rem",
            opacity: 0.6,
          }}
        >
          © {new Date().getFullYear()} SherpApp — Todos los derechos reservados
        </footer>
      </body>
    </html>
  );
}
