import "./styles.css";

document.getElementById("app").innerHTML = `

<table class="page">
 <tr>
    <td style="width:50%;" rowspan="4">
      <img src="1.PNG" />
    </td>
 </tr>
 <tr>
   <td colspan="2">
     <button id="connect_button">Connect</button>
    </td>
  </tr>
   <tr style="height:60%;">
    <td style="width:25%;">
    CURRENT BLOCK
    <h5 id="current_block">1100000</h5>
    PRICE
    <h5>300 KLAY</h5>
  </td>
    <td style="width:25%;">
    EVENT BLOCK
    <h5 id="event_block">1100000</h5>
    PER TX
    <h5>1</h5>
  </td>
 </tr>
 <tr>
   <td colspan="2">
    <button id="mint_button">MINT</button>
   </td>
  <tr>
</table>

`;

const connectbutton = document.querySelector("#connect_button");

const onClickConnectButton = async () => {
  //window.klaytn.enable();
  const accounts = await window.klaytn.enable();
  const account = accounts[0];
  document.querySelector("#connect_button").innerHTML = account;
};

connectbutton.addEventListener("click", onClickConnectButton);

const onClickMintButton = async () => {
  const accounts = await window.klaytn.enable();
  const account = accounts[0];
  console.log(window.klaytn.networkVersion);
  if (window.klaytn.networkVersion !== 1001) {
    // 8217 mainnet
    // 1001 testnet
    alert("Warning! It is not Baobab network");
    return;
  }
  const transactionParameters = {
    to: "0x1B7967C073Cc5D2B7B2A1728Fbd737b567cd533F",
    from: account,
    data:
      "0xa0712d680000000000000000000000000000000000000000000000000000000000000001",
    value: "0xB1A2BC2EC50000", //0.05 klay
    gas: "0x3476A"
  };

  window.klaytn.sendAsync(
    {
      method: "klay_sendTransaction",
      params: [transactionParameters],
      from: account
    },
    (receipt, result) => {
      console.log(receipt);
      console.log(result);
    }
  );
};
const mintbutton = document.querySelector("#mint_button");
mintbutton.addEventListener("click", onClickMintButton);

//const readbutton = document.querySelector("#read_button");
//const readUri = async () => {
//  console.log("Read Uri");

//kaikas 지갑이 있는지 확인하는 것
//  const klaytn = window.klaytn;
//  const accounts = await klaytn.enable();
//  const account = accounts[0]; // we currently only ever provide a single account,

// 하고 싶은 일
//  const transactionParameters = {
//    to: "0x1B7967C073Cc5D2B7B2A1728Fbd737b567cd533F",
//    from: account;
//    data: ""
//  };

// 하고 싶은 일 블록체인에 요청하기
// klaytn.sendAsync(
//    {
//      method: "klay_call",
//      params: [transactionParameters, "latest"],
//      from: account
//    },
//    (receipt, result) => {
//      console.log(receipt);
//      console.log(result);

//      document.querySelector("#storage").innerHTML = result.result;
//    }
//  );
//};
//readbutton.addEventListener("click",readUri);

//버튼을 눌렀을 때 storage에서 값을 가져와 출력하기
