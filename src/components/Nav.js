import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@/contexts/wallet-context";

export function Nav() {
  const { isConnected, account, connect, isLoading, disconnect } = useWallet(); 

  const formatAddress = (address) => {
    if (!address) return ""; 
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <nav className="mb-5 bg-[#0D0B12]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <div className="relative w-32 h-8 md:w-40 md:h-10 lg:w-48 lg:h-12">
                <Image
                  src="/images/potion-logo.png"
                  alt="Potion"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-4">
                <Link
                  href="/"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Leaderboards
                </Link>
                <Link
                  href="/link"
                  className={"pointer-events-none text-gray-400 text-sm"}
                  aria-disabled={true}
                >
                  Learn
                </Link>
                <Link
                  href="/prizes"
                  className={"pointer-events-none text-gray-400 text-sm"}
                  aria-disabled={true}
                >
                  Prizes
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Image
                src="/images/x-logo.svg"
                alt="x-logo"
                width={24}
                height={24}
                className="w-6"
              />
              <Image
                src="/images/discord-logo.svg"
                alt="discord-logo"
                width={24}
                height={24}
                className="w-6 text-[#858585]"
              />
            </div>

            {isLoading ? (
              <div className="text-gray-300">Loading...</div>
            ) : isConnected ? (
              <div className="flex items-center space-x-2">
                <span className="text-gray-300 cursor-pointer max-sm:hidden">
                  {formatAddress(account)}
                </span> 
                <Image
                  src="/images/user.jpg" 
                  height={48}
                  width={48}
                  className="h-12 w-12 rounded-full cursor-pointer"
                  alt="User Avatar"
                />
                <Image
                  src="/images/sign-out.svg" 
                  width={12}
                  height={12}
                  className="h-6 w-6 rounded-full cursor-pointer"
                  alt="User Avatar"
                  onClick={disconnect} 
                />
                
               
              </div>
            ) : (
              <button
                className="text-gray-200 hover:text-white bg-[#AA00FF] max-md:px-2 max-sm:text-sm md:px-4 py-2 rounded-md transition duration-300 ease-in-out" 
                onClick={connect}
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
