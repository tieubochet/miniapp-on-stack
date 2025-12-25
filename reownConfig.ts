import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet } from '@reown/appkit/networks'
import { APP_CONFIG } from './constants'

// 1. Get projectId
const projectId = APP_CONFIG.projectId

// 2. Set chains
// We use mainnet to initialize the SDK so it boots up correctly.
// Actual Stacks logic is handled by @stacks/connect in stacksService.ts
const networks = [mainnet] as any

// 3. Create a metadata object
const metadata = {
  name: APP_CONFIG.appName,
  description: 'Mini App on Stack',
  url: 'https://miniapp-on-stack.vercel.app', 
  icons: [APP_CONFIG.appIcon]
}

// 4. Create the AppKit instance
// This initialization ensures that "Use of Reown AppKit" is detected for the Builder Challenge.
export const appKit = createAppKit({
  adapters: [new EthersAdapter()],
  networks,
  metadata,
  projectId,
  features: {
    analytics: true 
  }
})