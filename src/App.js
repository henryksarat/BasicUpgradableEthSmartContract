import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./App.css";
const ethers = require("ethers")
import BoxV2 from "./contracts/BoxV2.sol/BoxV2.json";
const boxV2Address = "<DEPLOYED_ADDRESS>"
console.log(boxV2Address, "BoxV2 ABI: ", BoxV2.abi);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(undefined);

  useEffect(() => {
    const fetchCount = async () => {
    const data = await readCounterValue();
    return data;
    };
  
    fetchCount().catch(console.error);
  }, []);

  async function readCounterValue() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(
            boxV2Address,
            BoxV2.abi,
            provider
        );  
        try {
            const data = await contract.retrieve();
            setCount(parseInt(data.toString()));
        } catch (err) {
            console.log("Error: ", err);
            alert("Make sure your Metamask is set to the network you deployed the smart contract to!");
        }
    }
  }

  async function updateCounter() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const signerResult = await signer;
        const contractAction = new ethers.Contract(boxV2Address, BoxV2.abi, signerResult);
        const transaction = await contractAction.increment();
        setIsLoading(true);
        await transaction.wait();
        setIsLoading(false);
        readCounterValue();
    }
  }

  async function updateStoreValue() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const signerResult = await signer;
        const contractAction = new ethers.Contract(boxV2Address, BoxV2.abi, signerResult);
        const transaction = await contractAction.store(number);
        setIsLoading(true);
        await transaction.wait();
        setIsLoading(false);
        readCounterValue();
    }
  }

  const incrementCounter = async () => {
    await updateCounter();
  };

  const storeValue = async () => {
    await updateStoreValue();
  };

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, marginTop: 20 }}>
        <CardContent>
          <div>
            Store a value on the smart contact, must be the deployer 
            <TextField 
              id="outlined-basic" 
              label="Store Value" 
              variant="outlined"   
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
              }}
            />
          </div>
          <p></p>
          <Button 
            onClick={storeValue} variant="outlined"
            disabled={isLoading}
          >
            {isLoading ? "loading..." : "Store Value"}
          </Button>
          <p></p>
          <div>
            <p>You can increment by 1 even if not the deployer</p>
            <Button 
              onClick={incrementCounter} variant="outlined"
              disabled={isLoading}
            >
              {isLoading ? "loading..." : "Increment by +1"}
          </Button>
          </div>
          <p>Value Stored: {count}</p>
        </CardContent>
      </Card>
    </Container>
  );
}

export default App;
