import Image from "next/image";

const formatFollowers = (followers) => {
  if (followers >= 1000) {
    return `${(followers / 1000).toFixed(1)}k`;
  }
  return followers.toString();
};

export default function UserProfile({
  username,
  address,
  twitter,
  followers,
  lastTrade,
}) {
  return (
    <div className="flex flex-col gap-4 max-lg:w-full xl:w-[400px] 2xl:w-[500px]">
      <div className="flex items-center gap-4">
        <Image
          src="/images/user.jpg"
          alt={username}
          width={80}
          height={80}
          className="rounded-full w-20 h-20"
        />
        <div>
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-gray-400">{address}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-px bg-gray-800 overflow-hidden">
        <div className="bg-[#1A1825] p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">X Account</span>
            <div className="text-right">
              <div>{twitter}</div>
              <div className="text-sm text-gray-400">{formatFollowers(followers)} followers</div>
            </div>
          </div>
        </div>
        <div className="bg-[#1A1825] p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Last Trade</span>
            <div className="flex items-center gap-2">
              {lastTrade}{" "}
              <Image
                src={"/images/bullX.png"}
                width={32}
                height={32}
                alt="ETH"
                className="h-8 w-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
