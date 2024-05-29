const { XrplClient } = require("xrpl-client");
const { utils, derive } = require("xrpl-accountlib");
const User = require('../Model/userModels');
const client = new XrplClient(process.env.xrpltestnet);
const xrpl = require('xrpl');

const generateAccount = async (secretKey, res) => {
    let account;
    if (!utils.isValidSeed(secretKey)) {
        console.log("Invalid secret");
        res.status(400).json({ status: "error", message: "Invalid secret" });
        return null;
    }
    account = derive.familySeed(secretKey);

    const data = await client.send({
        id: 1,
        command: "account_info",
        account: account.address,
        strict: true // Ensures strict validation of the account
    });
    if (data.error) {
        console.log("Error:", data.error_message);
        res.json({ status: "error", message: data.error_message });
        return null;
    }
    console.log("account", account.address);
    return account.address; // Return the account address
};

exports.addXrplAccount = async (req, res) => {
    try {
        const { id, secretKey } = req.body;
        const accountAddress = await generateAccount(secretKey, res);
        if (!accountAddress) {
            return; // Error response already sent in generateAccount
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Add the new XRPL account to the account array
        if (!user.account) {
            user.account = [];
        }
        user.account.push(accountAddress);

        const response = await user.save();

        res.status(200).json({ message: "XRPL account added successfully", user: response, status: "success" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



exports.getxrplBalance = async (req, res) => {
    try {
        const { account } = req.body
        const data = await client.send({
            id: 1,
            command: "account_info",
            account: account,
            strict: true // Ensures strict validation of the account
        });
        if (data.account_data.Balance) {
            res.json({
                status: "success",
                Balance: Number(data.account_data.Balance) / 1000000 - 10 - 2 * data.account_data.OwnerCount
            })
        } else {
            res.json({
                status: "error",
                Bmessage: "not a valid address"
            })
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}


exports.getTokens = async (req, res) => {
    try {
        let net = process.env.xrpltestnet;
        const clients = new xrpl.Client(net);
        await clients.connect(); // Add this line to connect to the XRPL client

        const { raddress } = req.body;
        const nfts = await clients.request({
            method: "account_nfts",
            account: raddress
        });
        const accountNfts = nfts.result.account_nfts;
        const uriList = [];
        accountNfts.forEach(nft => {
            const uri = Buffer.from(nft.URI, 'hex').toString('utf-8');
            uriList.push(uri);
        });

        console.log("NFT URI List:", uriList);
        res.json({ status: "success", uriList: uriList });
    } catch (error) {
        console.error("Error fetching tokens:", error);
        res.status(500).json({ status: "error", message: "Failed to fetch tokens" });
    }
}

