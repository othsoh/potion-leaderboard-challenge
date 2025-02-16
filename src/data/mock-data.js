export const tokens = [
  {
    name: "Solana",
    code: "SOL",
    address: "FEcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV",
    image: "/images/default-avatar.png",
  },
  {
    name: "Ethereum",
    code: "ETH",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    image: "/images/default-avatar.png",
  },
  {
    name: "Bitcoin",
    code: "BTC",
    address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
    image: "/images/default-avatar.png",
  },
];

export const users = [
  {
    id: 1,
    rank: 1,
    xHandle: "solana_whale",
    walletAddress: "7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV",
    profilePicture: "/images/user.jpg",
    followers: 2500,
    totalTrades: 800,
    successfulTrades: 780,
    winRate: "85%",
    avgBuy: { sol: 3.2, usd: 72069 },
    avgEntry: 68500,
    avgHold: "2",
    realizedPNL: { sol: 10.3, usd: 225000 },
    socialsUsername: "whale",
    tokens: [tokens[0], tokens[1]],
    trades: [1, 5, 9], // Trade IDs belonging to this user
  },
  {
    id: 2,
    rank: 2,
    xHandle: "crypto_king",
    walletAddress: "7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV",
    profilePicture: "/images/default-avatar.png",
    followers: 1800,
    totalTrades: 876,
    successfulTrades: 630,
    winRate: "72%",
    avgBuy: { sol: 1.5, usd: 52645 },
    avgEntry: 41000,
    avgHold: "3",
    realizedPNL: { sol: 4, usd: 98000 },
    socialsUsername: "KingsCr",
    tokens: [tokens[1], tokens[2]],
    trades: [2, 6, 10], // Trade IDs belonging to this user
  },
  {
    id: 3,
    rank: 3,
    xHandle: "defi_queen",
    walletAddress: "7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV",
    profilePicture: "/images/user.jpg",
    followers: 1500,
    totalTrades: 543,
    successfulTrades: 346,
    winRate: "65%",
    avgBuy: { sol: 0.5, usd: 2346 },
    avgEntry: 23500,
    avgHold: "5",
    realizedPNL: { sol: -3, usd: -45000 },
    socialsUsername: "TheQueen",
    tokens: [tokens[0], tokens[2]],
    trades: [3, 7], // Trade IDs belonging to this user
  },
  {
    id: 4,
    rank: 4,
    xHandle: "solana_pixie",
    walletAddress: "7EcDhSYGxXyscszYEp35KHN8vvw3svAuLKTzXwCFLtV",
    profilePicture: "/images/user.jpg",
    followers: 2500,
    totalTrades: 1234,
    successfulTrades: 225,
    winRate: "90%",
    avgBuy: { sol: 1.0, usd: 80000 },
    avgEntry: 79000,
    avgHold: "3",
    realizedPNL: { sol: 15, usd: 250000 },
    socialsUsername: "pixie_sol",
    tokens: [tokens[0], tokens[1], tokens[2]],
    trades: [4, 8], // Trade IDs belonging to this user
  },
];

export const trades = [
  {
    id: 1,
    userId: 1, // Trade belongs to user with id 1
    token: tokens[0],
    lastTrade: "2min",
    mc: 820031,
    invested: { sol: 101.2, usd: 23276 },
    realizedPNL: { sol: 10.3, usd: 225000 },
    roi: "85%",
    trades: { successfulTrades: 1, total: 3 },
    holding: { sol: 550, usd: 72069 },
    avgBuy: { sol: 12, usd: 72069 }, // Updated to include SOL and USD
    avgSell: 80000,
    held: "2min",
  },
  {
    id: 2,
    userId: 2, // Trade belongs to user with id 2
    token: tokens[1],
    lastTrade: "3min",
    mc: 23000,
    invested: { sol: 50.5, usd: 12345 },
    realizedPNL: { sol: 4, usd: 98000 },
    roi: "72%",
    trades: { successfulTrades: 3, total: 5 },
    holding: { sol: 320, usd: 52645 },
    avgBuy: { sol: 10.5, usd: 53204 }, // Updated to include SOL and USD
    avgSell: 60000,
    held: "3min",
  },
  {
    id: 3,
    userId: 3, // Trade belongs to user with id 3
    token: tokens[2],
    lastTrade: "5min",
    mc: 10433,
    invested: { sol: -10.0, usd: -2000 },
    realizedPNL: { sol: 3, usd: -45000 },
    roi: "65%",
    trades: { successfulTrades: 7, total: 8 },
    holding: { sol: 24, usd: 2346 },
    avgBuy: { sol: 3.2, usd: 3209 }, // Updated to include SOL and USD
    avgSell: 3000,
    held: "5min",
  },
  {
    id: 4,
    userId: 4, // Trade belongs to user with id 4
    token: tokens[0],
    lastTrade: "3min",
    mc: 1900,
    invested: { sol: 20, usd: 50000 },
    realizedPNL: { sol: 15, usd: 250000 },
    roi: "90%",
    trades: { successfulTrades: 5, total: 6 },
    holding: { sol: 600, usd: 80000 },
    avgBuy: { sol: 1.6, usd: 1392 }, // Updated to include SOL and USD
    avgSell: 90000,
    held: "3min",
  },
  {
    id: 5,
    userId: 1, // Trade belongs to user with id 1
    token: tokens[2],
    lastTrade: "1min",
    mc: 150000,
    invested: { sol: 75.0, usd: 15000 },
    realizedPNL: { sol: 8.5, usd: 170000 },
    roi: "78%",
    trades: { successfulTrades: 2, total: 4 },
    holding: { sol: 400, usd: 60000 },
    avgBuy: { sol: 5, usd: 9873 }, // Updated to include SOL and USD
    avgSell: 70000,
    held: "1min",
  },
  {
    id: 6,
    userId: 2, // Trade belongs to user with id 2
    token: tokens[2],
    lastTrade: "4min",
    mc: 50000,
    invested: { sol: 30.0, usd: 10000 },
    realizedPNL: { sol: 5.0, usd: 120000 },
    roi: "60%",
    trades: { successfulTrades: 4, total: 6 },
    holding: { sol: 200, usd: 30000 },
    avgBuy: { sol: 0.3, usd: 85 }, // Updated to include SOL and USD
    avgSell: 35000,
    held: "4min",
  },
  {
    id: 7,
    userId: 3, // Trade belongs to user with id 3
    token: tokens[2],
    lastTrade: "6min",
    mc: 75000,
    invested: { sol: 90.0, usd: 18000 },
    realizedPNL: { sol: 12.0, usd: 240000 },
    roi: "88%",
    trades: { successfulTrades: 3, total: 5 },
    holding: { sol: 500, usd: 75000 },
    avgBuy: { sol: 24, usd: 7543 }, // Updated to include SOL and USD
    avgSell: 85000,
    held: "6min",
  },
  {
    id: 8,
    userId: 4, // Trade belongs to user with id 4
    token: tokens[0],
    lastTrade: "2min",
    mc: 30000,
    invested: { sol: 40.0, usd: 8000 },
    realizedPNL: { sol: 6.0, usd: 140000 },
    roi: "70%",
    trades: { successfulTrades: 2, total: 3 },
    holding: { sol: 300, usd: 45000 },
    avgBuy: { sol: 0.5, usd: 456 }, // Updated to include SOL and USD
    avgSell: 50000,
    held: "2min",
  },
  {
    id: 9,
    userId: 1, // Trade belongs to user with id 1
    token: tokens[1],
    lastTrade: "7min",
    mc: 90000,
    invested: { sol: 100.0, usd: 20000 },
    realizedPNL: { sol: 18.0, usd: 360000 },
    roi: "95%",
    trades: { successfulTrades: 5, total: 7 },
    holding: { sol: 700, usd: 105000 },
    avgBuy: { sol: 16, usd: 896453 }, // Updated to include SOL and USD
    avgSell: 120000,
    held: "7min",
  },
  {
    id: 10,
    userId: 2, // Trade belongs to user with id 2
    token: tokens[2],
    lastTrade: "3min",
    mc: 60000,
    invested: { sol: 60.0, usd: 12000 },
    realizedPNL: { sol: 9.0, usd: 180000 },
    roi: "80%",
    trades: { successfulTrades: 4, total: 6 },
    holding: { sol: 450, usd: 67500 },
    avgBuy: { sol: 0.7, usd: 456 }, // Updated to include SOL and USD
    avgSell: 75000,
    held: "3min",
  },
];
