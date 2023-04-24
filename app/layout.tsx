import ClientOnly from "./components/ClientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import NavBar from "./components/navbar/NavBar";
import { Nunito } from "next/font/google";
import ToasterProvider from "./provider/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import "./globals.css";
import RentModal from "./components/modals/RentModal";


export const metadata = {
  title: "Airbnb",
  description: "Aribnb",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser=await getCurrentUser()
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider />
          <RentModal/>
          <LoginModal/>
          <RegisterModal />
          <NavBar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28"></div>
        {children}
      </body>
    </html>
  );
}
