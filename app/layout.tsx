import './globals.css'

export const metadata = {
  title: 'LinkStream',
    description: 'Marketplace digital',
    }

    export default function RootLayout({
      children,
      }: {
        children: React.ReactNode
        }) {
          return (
              <html lang="es">
                    <body className="bg-[#05070d] text-white antialiased">
                            {children}
                                  </body>
                                      </html>
                                        )
                                        }