import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import ClientBodyWrapper from "@/components/ClientBodyWrapper";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "BlinkCart - GreatStack",
  description: "E-Commerce with Next.js ",
};

export default function RootLayout({ children }) {
  const bodyClassName = `${outfit.className} antialiased text-gray-700`;

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={bodyClassName} suppressHydrationWarning={true}>
          <ClientBodyWrapper className={bodyClassName}>
            <Toaster />
            <AppContextProvider>{children}</AppContextProvider>
          </ClientBodyWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
