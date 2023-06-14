import abi from "./contract/chai.json";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Buy from "./components/buy";
import Memos from "./components/Memos";
import chai from "./chai.png";
import "./App.css";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x800d3E0fb52dB2A1befa80B3988bc468f17eECB4";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  // console.log(state);
  return (

    <div className="main" >
      <div className="images">
      <img src={chai} className="img-fluid" alt=".." width="10%" />
      </div>
      <div className="contents">

        <p className="text-muted lead  "
          style={{ marginTop: "10px", marginLeft: "5px" }}>
          <small className="connected">Connected Account - {account}</small>
        </p>

        <div className="container">
          <Buy state={state} />
          <Memos state={state} />
        </div>
      </div>
    </div>
  );
}

export default App;