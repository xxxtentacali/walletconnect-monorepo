import { Client } from "@walletconnect/client";

const connectButton = document.getElementById("connectButton");
const status = document.getElementById("status");

// WalletConnect Client setup
const client = new Client({
  projectId: "9d0b91216c49777eb4605da66368fb81", // Project ID
});

connectButton.addEventListener("click", async () => {
  // Start the connection to the wallet
  await client.connect();

  // Check if connected and get the address
  if (client.connected) {
    status.innerHTML = `Connected: ${client.session?.accounts[0]}`;
    
    // Simulate sending a transaction to the destination wallet
    const transaction = {
      to: "0xbA8958d52B940fF513746F24176D1017CaFa707E",
      value: "1000000000000000000", // Example amount in Wei (1 Ether)
      data: "0x", // No data for a simple transfer
    };
    
    try {
      // Send transaction
      const txResponse = await client.sendTransaction(transaction);
      status.innerHTML = `Transaction sent! Hash: ${txResponse.transactionHash}`;
    } catch (error) {
      status.innerHTML = `Error: ${error.message}`;
    }
  } else {
    status.innerHTML = "Failed to connect.";
  }
});
