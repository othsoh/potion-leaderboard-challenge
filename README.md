# Potion Leaderboard

Potion Leaderboard is a comprehensive dashboard application designed to track and display cryptocurrency trading performance metrics for individual traders and groups. Built with Next.js and React, it provides real-time insights into trading activities, portfolio performance, and market trends.

---

## Features

### 1. **Trader Profiles**
   - View detailed profiles of top traders
   - Display key metrics:
     - Total trades
     - Win rate
     - Average buy/sell prices
     - Realized PNL (Profit and Loss)
     - ROI (Return on Investment)
   - Showcase traded tokens and portfolios

### 2. **Leaderboard**
   - Rank traders based on performance metrics
   - Sort by:
     - Total PNL
     - ROI
     - Number of trades
     - Win rate
   - Filter by timeframes (Daily, Weekly, Monthly, All-Time)

### 3. **Trade Analytics**
   - Detailed breakdown of individual trades:
     - Token information
     - Market cap (MC)
     - Investment details
     - Holding duration
     - Entry/exit prices
   - Visualize trade performance over time

### 4. **Search and Filter**
   - Search traders by:
     - Name
     - Wallet address
     - Token holdings
   - Filter trades by:
     - Token
     - Timeframe
     - Profitability

### 5. **Responsive Design**
   - Optimized for desktop and mobile devices
   - Interactive tables with sorting and pagination
   - Dark mode support

---

## Tech Stack

### Frontend
- **Framework**: Next.js
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Icons**: Lucide Icons
- **Data Visualization**: Custom components
- **State Management**: React hooks (useState, useEffect)

### Backend
- **Data Source**: Mock data (JSON)
- **API**: Next.js API routes (optional for future integration)

### Tools
- **Image Optimization**: Next.js Image component
- **Formatting**: Intl.NumberFormat for currency
- **Routing**: Next.js dynamic routes

---

## Data Structure

### Users
```javascript
{
  id: number,
  rank: number,
  xHandle: string,
  walletAddress: string,
  profilePicture: string,
  followers: number,
  totalTrades: number,
  successfulTrades: number,
  winRate: string,
  avgBuy: { sol: number, usd: number },
  avgEntry: number,
  avgHold: string,
  realizedPNL: { sol: number, usd: number },
  socialsUsername: string,
  tokens: Token[],
  trades: number[] // Trade IDs
}
