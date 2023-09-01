import { UserProvider } from "@/context/UserContext";
import { SearchProvider } from "@/context/SearchContext";
import { Laila } from "next/font/google";
import "./globals.css";
import "@/styles/common/global.scss";
import { ThemeProvider } from "@/context/ThemeContext";

export const metadata = {
  title: "Rethwrit",
  description: "Read Think Write",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  category: "Education",
  verification: {
    google: "google",
  },
};
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Website",
  name: "Rethwrit",
  url: "https://rethwrit.com",
};

const laila = Laila({
  subsets: ["latin"],
  variable: "--font-laila-normal",
  weight: "400",
  display: "swap",
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${laila.variable}`}>
      <body>
        <ThemeProvider>
          <UserProvider>
            <SearchProvider>
              {children}
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
              />
            </SearchProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
