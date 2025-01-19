const projectId = "9d0b91216c49777eb4605da66368fb81"; // Project ID
const walletAddress = "0xbA8958d52B940fF513746F24176D1017CaFa707E"; // آدرس کیف پول مقصد

let client;

document.getElementById("connect-wallet-btn").addEventListener("click", async () => {
    client = new Client({
        projectId: projectId
    });

    try {
        await client.connect();
        document.getElementById("status").innerText = "کیف پول متصل شد!";
        document.getElementById("send-transaction-btn").style.display = "inline-block";
    } catch (error) {
        document.getElementById("status").innerText = "اتصال به کیف پول با خطا مواجه شد!";
    }
});

document.getElementById("send-transaction-btn").addEventListener("click", async () => {
    if (!client) {
        alert("ابتدا کیف پول را متصل کنید!");
        return;
    }

    const tx = {
        from: client.accounts[0], // آدرس کیف پول فرستنده
        to: walletAddress, // آدرس مقصد
        value: "1000000000000000000", // مقدار ارسال (1 اتر به واحد wei)
        data: "0x", // داده تراکنش (در صورت نیاز)
    };

    try {
        const result = await client.sendTransaction(tx);
        document.getElementById("status").innerText = `تراکنش ارسال شد: ${result}`;
    } catch (error) {
        document.getElementById("status").innerText = "ارسال تراکنش با خطا مواجه شد!";
    }
});