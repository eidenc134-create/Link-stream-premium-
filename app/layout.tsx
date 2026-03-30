import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "LinkStream",
    description: "Marketplace de cuentas premium",
    };

    export default function RootLayout({
      children,
      }: {
        children: React.ReactNode;
        }) {
          return (
              <html lang="es">
                    <body className="bg-black text-white">
                            <Navbar />
                                    <main>{children}</main>
                                          </body>
                                              </html>
                                                );
                                                }