import NavBar from "./components/navbar/NavBar";
import "./globals.css";
import { Nunito } from "next/font/google";
import Modals from "./components/modals/Modals";
export const metadata = {
  title: "Airbnb",
  description: "Aribnb",
};
const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
