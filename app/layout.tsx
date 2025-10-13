import type { Metadata } from "next";
import './globals.css'

export const metadata: Metadata = {
  title: "Uma Yuru",
  description: "Tools untuk game Uma Musume",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <div className="container">
          <div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
