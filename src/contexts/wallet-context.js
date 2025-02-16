"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrowserProvider, formatEther } from "ethers"; // Updated ethers import
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

const WalletContext = createContext({});

export function WalletProvider({ children }) {
  const [isConnected, setIsConnected] = useState(false);
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [account, setAccount] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const router = useRouter(); // Initialize useRouter

  // Check if MetaMask is installed
  const isMetaMaskInstalled = () => {
    return (
      typeof window !== "undefined" && typeof window.ethereum !== "undefined"
    );
  };

  // Connect to MetaMask
  const connect = async () => {
    if (!isMetaMaskInstalled()) {
      alert("Please install MetaMask to connect your wallet.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        // Get network information
        const network = await provider.getNetwork();
        console.log("Connected to network:", network.name);

        // Get balance
        const balance = await provider.getBalance(address);
        const formattedBalance = formatEther(balance);
        console.log("Account balance:", formattedBalance);

        // Update state
        setIsConnected(true);
        setAccount(address);
        setShowConnectModal(false);

        console.log("Connected to MetaMask with address:", address);
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
      alert("Failed to connect to MetaMask. Please try again.");
    }
  };

  // Disconnect wallet
  const disconnect = () => {
    setIsConnected(false);
    setAccount(null);
    console.log("Wallet disconnected");
    router.push("/"); // Redirect to home page

  };

  // Check if wallet is already connected on page load
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (isMetaMaskInstalled()) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });

          if (accounts.length > 0) {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const address = await signer.getAddress();

            setIsConnected(true);
            setAccount(address);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
      setIsLoading(false); // Set loading to false after checking connection
    };

    checkWalletConnection();

    // Add event listeners for account and chain changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
        } else {
          setAccount(null);
          setIsConnected(false);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });
    }

    // Cleanup event listeners
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", () => {});
        window.ethereum.removeListener("chainChanged", () => {});
      }
    };
  }, []);

  const requireWallet = (callback) => {
    if (!isConnected) {
      console.log("Wallet not connected, showing modal...");
      setShowConnectModal(true);
      return;
    }
    callback();
  };

  return (
    <WalletContext.Provider
      value={{
        isConnected,
        account,
        connect,
        disconnect,
        requireWallet,
        isLoading, // Provide loading state
      }}
    >
      <div
        className={`relative transition-all duration-300 ${
          showConnectModal ? "blur-sm" : ""
        }`}
      >
        {children}
      </div>
      <AnimatePresence>
        {showConnectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 bottom-0 left-0 right-0 m-auto w-full h-full inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50"
            onClick={() => setShowConnectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="group select-none w-[250px] flex flex-col p-4 relative items-center justify-center bg-gray-800/90 backdrop-blur-md border border-gray-700 shadow-lg rounded-2xl"
            >
              <div className="text-center p-3 w-full flex-auto justify-center">
                <div className="flex justify-center">
                  <Image
                    src={"/images/metamask-logo.png"}
                    width={40}
                    height={40}
                    alt="MetaMask"
                    className="w-10 h-10 text-center"
                  />
                </div>
                <h2 className="text-xl font-bold py-4 text-gray-200">
                  Connect Wallet
                </h2>
                <p className="font-bold text-sm text-gray-400 px-2">
                  Please connect your wallet to continue.
                </p>
              </div>
              <div className=" p-2 text-center flex w-full justify-between">
                <button
                  style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem" }} // Equivalent to px-5
                  className="mb-2 md:mb-0 bg-gray-700 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                  onClick={() => setShowConnectModal(false)}
                >
                  Cancel
                </button>
                <button
                  style={{ paddingLeft: "1.25rem", paddingRight: "1.25rem" }} // Equivalent to px-5
                  className="bg-[#AA00FF] hover:bg-transparent py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
                  onClick={connect}
                >
                  Connect Wallet
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);

export default WalletContext;
