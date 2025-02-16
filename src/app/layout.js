import { WalletProvider } from "@/contexts/wallet-context";
import "./globals.css";

export const metadata = {
  title: "Potion Leaderboard",
  description: "Leaderboard for the Potion community",
  icons: {
    icon: '/favicon.ico', // Ensure this file exists in the public folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-[#0D0B12] text-white">
          <WalletProvider>{children}</WalletProvider>
        </div>
      </body>
    </html>
  );
}