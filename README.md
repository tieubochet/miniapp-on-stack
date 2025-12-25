# Mini App on Stack

A Web3 application built on the Stacks blockchain designed to gamify developer activity. Connect your wallet, maintain your daily check-in streak, and mint exclusive NFTs when you reach specific milestones.

## 🚀 Features

- **Wallet Connection**: Seamless integration with Stacks wallets (Leather, Xverse) using [Reown AppKit](https://reown.com/).
- **Daily Check-in System**: Interact directly with a Clarity smart contract to record your daily activity on-chain.
- **Streak Tracking**: Automatically tracks consecutive check-ins and total activity.
- **Conditional NFT Minting**: Logic to allow minting a "Streak NFT" every 7 days of consecutive activity.
- **Analytics Dashboard**: Visualizes user metrics, fees, and contributions using Recharts.

## 🛠 Tech Stack

- **Frontend**: React (v18), Vite, TypeScript
- **Styling**: Tailwind CSS
- **Web3 Integration**: 
  - `@reown/appkit` & `@reown/appkit-adapter-stacks`
  - `@stacks/connect` & `@stacks/network`
- **Icons**: Lucide React
- **Charts**: Recharts

## 📦 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mini-app-on-stack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configuration**
   The project configuration is located in `constants.ts`. You may need to update the following if you deploy your own contract:
   
   - `contractAddress`: The Stacks address where the contract is deployed.
   - `contractName`: The name of the deployed Clarity contract.
   - `projectId`: Your Reown Cloud Project ID (Get one at [cloud.reown.com](https://cloud.reown.com)).

4. **Run Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## 🔗 Smart Contract Interface

The app interacts with a Clarity contract (`teeboo-streak` or similar) with the following key functions:

- `(check-in)`: Public function. Records a user's daily check-in, increments streak, and mints an NFT if the streak hits a multiple of 7.
- `(get-user principal)`: Read-only. Returns the `current-streak`, `max-streak`, and `total-checkins` for a user.
- `(get-global-stats)`: Read-only. Returns total users and total check-ins across the platform.

## 📝 License

MIT
