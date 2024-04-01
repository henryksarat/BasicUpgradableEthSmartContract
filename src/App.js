import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from '@mui/material/CardHeader';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import { red, blue } from "@mui/material/colors";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import "./App.css";
const ethers = require("ethers")
import BasicStorageV2 from "./contracts/BasicStorageV2.sol/BasicStorageV2.json";
const basicStorageAddress = "<DEPLOYED_ADDRESS>"
console.log(basicStorageAddress, "BasicStorageV2 ABI: ", BasicStorageV2.abi);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [number, setNumber] = useState(undefined);
  const [openValue, setOpenValue] = useState(undefined);
  const [retreivedOpenValue, setRetreivedOpenValue] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      await readCounterValue();
      await readOpenValue();
    };
  
    fetchCount().catch(console.error);
  }, []);

  const getContract = async => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(
        basicStorageAddress,
        BasicStorageV2.abi,
        provider
    );  
  }

  async function readCounterValue() {
    if (typeof window.ethereum !== "undefined") {
        const contract = await getContract();
        try {
            const data = await contract.retrieve();
            setCount(parseInt(data.toString()));
        } catch (err) {
            console.log("Error: ", err);
            alert("Make sure your Metamask is set to the network you deployed the smart contract to!");
        }
    }
  }

  async function readOpenValue() {
    if (typeof window.ethereum !== "undefined") {
        const contract = await getContract();
        try {
            const data = await contract.retrieveOpen();
            setRetreivedOpenValue(parseInt(data.toString()));
        } catch (err) {
            console.log("Error: ", err);
            alert("Make sure your Metamask is set to the network you deployed the smart contract to!");
        }
    }
  }

  const executeIncrementOnSmartContract = async (contractAction) => {
    return await contractAction.increment();
  }

  const executeStoreOpenValueOnSmartContract = async (contractAction) => {
    return await contractAction.storeOpenValue(openValue);
  }

  const executeStoreValueOnSmartContract = async (contractAction) => {
    return await contractAction.store(number);
  }
  

  async function genericWriteToSmartContract(functionToExecuteOnSmartContract, refresh) {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const signerResult = await signer;
        const contractAction = new ethers.Contract(basicStorageAddress, BasicStorageV2.abi, signerResult);
        const transaction = await functionToExecuteOnSmartContract(contractAction);
        setIsLoading(true);
        await transaction.wait();
        setIsLoading(false);
        refresh();
    }
  }

  const incrementCounter = async () => {
    await genericWriteToSmartContract(
      executeIncrementOnSmartContract, 
      readCounterValue
    );
  };

  const storeValue = async () => {
    await genericWriteToSmartContract(
      executeStoreValueOnSmartContract, 
      readCounterValue
    );
  };

  const storeOpenValue = async () => {
    await genericWriteToSmartContract(
      executeStoreOpenValueOnSmartContract, 
      readOpenValue
    );
  };

  return (

    <Container maxWidth="sm">
        <Grid
          container
          spacing={1}
          direction="row"
          justify="flex"
          alignItems="flex"
        >
        <Grid item xs={6}>
          <Card sx={{ minWidth: 100, marginTop: 20 }}>
          <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  Own
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                </IconButton>
              }
              title="Deployer Only"
              subheader="Must be the Deployer to Execute these actions"
            />
            <CardContent>
              <div>
                <p>Store a value</p>
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
              <div>
              <Button 
                onClick={storeValue} variant="outlined"
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "Store Value"}
              </Button>
              </div>
              <p>Value Stored: {count}</p>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ minWidth: 100, marginTop: 20 }}>
          <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: blue[500] }} aria-label="recipe">
                  Other
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                </IconButton>
              }
              title="Anyone"
              subheader="Can be anyone to execute these actions"
            />
            <CardContent>
              <div>
                <p>Store an Open Value</p>
                <TextField 
                  id="outlined-basic" 
                  label="Store Open Value" 
                  variant="outlined"   
                  value={openValue}
                  onChange={(e) => {
                    setOpenValue(e.target.value);
                  }}
                />
              </div>
              <p></p>
              <Button 
                onClick={storeOpenValue} variant="outlined"
                disabled={isLoading}
              >
                {isLoading ? "loading..." : "Store Open Value"}
              </Button>
              <p></p>
              <p>Open Value Stored: {retreivedOpenValue}</p>
              <p></p>
              <div>
                <Button 
                  onClick={incrementCounter} variant="outlined"
                  disabled={isLoading}
                >
                  {isLoading ? "loading..." : "Increment Stored Value by +1"}
              </Button>
              </div>
              <p>Value Stored: {count}</p>
            </CardContent>
          </Card>
          </Grid>
      </Grid>
    </Container>
  );
}

export default App;
