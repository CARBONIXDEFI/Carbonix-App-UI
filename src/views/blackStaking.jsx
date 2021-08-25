import { useEffect } from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Dropdown, Card, Col, Container, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, InputGroupButtonDropdown, InputGroupText, Row, Table } from "reactstrap";
import web3 from "../web3";
import cbusd from "./cbusdAbi";
import black from "./blackAbi";
import blackstake from "./blackStakeAbi";
const Blackstake = () => {
    let [activeTab, setActiveTab] = useState("Deposit");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [dropdownOpen1, setDropdownOpen1] = useState(false);
    const [multiple, setMultiple] = useState(false);    
    const[tid,setId] = useState("");
    const[tid1,setId1] = useState("");
    const[ap1,setAP] = useState("");
    const [totaldep,setTotaldeposit] = useState("");
    var[cbusdbalance,setcbusdbalance] = useState("");
    const[depositpercent,setdepositpercent] = useState("");
    const[values,setValues] = useState([]);
    const[staked,setStaked] = useState([]);
    const[reward,setReward] = useState([]);
    const[blackbal,setBlackBalance] =useState([]);
    const toggleDropDown = () => setDropdownOpen(!dropdownOpen);
    const toggle1 = () => setDropdownOpen1(!dropdownOpen1);
    let history = useHistory();
    
 const first = async () => {
    const accounts =  await web3.eth.getAccounts();     
    setBlackBalance(await black.methods.balanceOf(accounts[0]).call())    
    let b= await black.methods.allowance(accounts[0],"0x8F686692DFEb9019974dEb21312F2C5826592888").call();
 
    if(b>0){
      setAP(true);
    }
    else{
      setAP(false);
    }
    //setValues(await swap.methods.userInfo(accounts[0]).call());
    setStaked(await blackstake.methods.userInfo(accounts[0]).call());
    setReward(await blackstake.methods.pendingBlack(accounts[0]).call());
   

   
}      

    useEffect(() => {
        document.getElementById("header-title").innerText = "Staking";
    } )
    useEffect(() =>         
    {first()},[cbusdbalance,ap1,staked[0]],reward,blackbal)
   
    const deposit = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts();
        var valu = document.getElementById("tid1").value;
        var value = valu * 1000000000;      
        await blackstake.methods.deposit(value).send({from:accounts[0]});
        alert("staked succesfully")
        first();
      }

    const withdraw = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts();
        var valu = document.getElementById("tid2").value;
        var value = valu * 1000000000;        
        await blackstake.methods.withdraw(value).send({from:accounts[0]});
        alert("unstaked succesfully")
        first()
      }  

      const claimreward = async(event) => {
        event.preventDefault();
        if(reward >10000000000){
            const accounts =  await web3.eth.getAccounts();
            await blackstake.methods.claimReward().send({from:accounts[0]});    
        }
        else{
            alert("Your reward amount should be Greater then 10 to Claim ")
        }
           
        first()
        
      }
      const emergencywithdraw = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts();
        await blackstake.methods.emergencyWithdraw().send({from:accounts[0]});        
        first()
      }
    
      const balancepercent = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid1").value = false;  
        var twentyfive=(blackbal * 25)/100;
        setdepositpercent(parseFloat(twentyfive/1000000000).toFixed(5));
       
        document.getElementById("tid1").value = parseFloat(twentyfive/1000000000).toFixed(5);        
        
      }
       const balancepercent1 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid1").value = false;    
        var fifty=(blackbal * 50)/100;
        setdepositpercent(parseFloat(fifty/1000000000).toFixed(5));
        document.getElementById("tid1").value =  parseFloat(fifty/1000000000).toFixed(5);          
        
      } 


      const balancepercent2 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid1").value = false;    
        var seventyfive=(blackbal * 75)/100;
        setdepositpercent(parseFloat(seventyfive/1000000000).toFixed(5)); 
        document.getElementById("tid1").value = parseFloat(seventyfive/1000000000).toFixed(5);         
        
      }
      const balancepercent3 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid1").value = false;    
        var hundred=(blackbal * 100)/100;
        setdepositpercent(parseFloat(hundred/1000000000).toFixed(5)); 
        document.getElementById("tid1").value =  parseFloat(hundred/1000000000).toFixed(5);         
        
      }


      const withdrawbalancepercent = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid2").value = false;  
        var twentyfive=(staked[0] * 25)/100;
        setTotaldeposit(parseFloat(twentyfive/1000000000).toFixed(5));
        document.getElementById("tid2").value = parseFloat(twentyfive/1000000000).toFixed(5);        
        
      }
       const withdrawbalancepercent1 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid2").value = false;    
        var fifty=(staked[0]  * 50)/100;
        setTotaldeposit(parseFloat(fifty/1000000000).toFixed(5));
        document.getElementById("tid2").value = parseFloat(fifty/1000000000).toFixed(5);          
        
      } 


      const withdrawbalancepercent2 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid2").value = false;    
        var seventyfive=(staked[0]  * 75)/100;
        setTotaldeposit(parseFloat(seventyfive/1000000000).toFixed(5)); 
        document.getElementById("tid2").value =parseFloat(seventyfive/1000000000).toFixed(5);         
        
      }
      const withdrawbalancepercent3 = async(event) => {
        event.preventDefault();
        const accounts =  await web3.eth.getAccounts(); 
        document.getElementById("tid2").value = false;    
        var hundred=(staked[0]  * 100)/100;
        setTotaldeposit(parseFloat(hundred/1000000000).toFixed(5)); 
        document.getElementById("tid2").value =parseFloat(hundred/1000000000).toFixed(5);         
        
      }
      const approve = async() => {
        let account = await web3.eth.getAccounts();
        let amount = 1000000000000000000 +"000000000000000000"; 
        await black.methods.approve("0x8F686692DFEb9019974dEb21312F2C5826592888",amount).send({from:account[0]});
        first()
        alert("Approved Succesfully")
    }


    return (
        <section className="p-0 my-5">
            <Container fluid>
                <Row className="justify-content-center">
                    <Col xl="8" lg="8" md="10" sm="12">
                        <Card className="custom-card">
                            <div className="p-3">
                                <h4>stake  Black </h4>
                                <h6>The Stake Black and get reward</h6>
                                <Table bordered responsive className="mt-3">
                                    <thead>
                                        <tr>
                                            <
                                                
                                                th>Your Black</th>
                                            <th>Staked Black</th>
                                            <th> reward</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody className="text-center">
                                        <tr>
                                            <td>{parseFloat(blackbal/1000000000).toFixed(5)}</td>
                                            <td>{parseFloat(staked[0]/1000000000).toFixed(5)}</td>
                                            <td>{parseFloat(reward/1000000000).toFixed(5)}</td>
                                           
                                        </tr>
                                    </tbody>
                                </Table>
                                <div>         

{ ap1 === true ? 
(
(
<div>
                                <Container fluid>
                                    <Row>
                                        <Col xl="6" md="12">
                                            <InputGroup className="mt-3">
                                                <Input placeholder={depositpercent} style={{ height: "auto" }}type = "number" id="tid1"  />
                                                <InputGroupAddon addonType="append"><Button color="site-primary" onClick={deposit}>stake</Button></InputGroupAddon>
                                            </InputGroup>
                                            <div className="percentage smaller">
                                                <div className="percentage-item" onClick={balancepercent}>25%</div>
                                                <div className="percentage-item" onClick={balancepercent1}>50%</div>
                                                <div className="percentage-item" onClick={balancepercent2}>75%</div>
                                                <div className="percentage-item" onClick={balancepercent3}>100%</div>
                                            </div>
                                        </Col>
                                        <Col xl="6" md="12">
                                            <InputGroup className="mt-3">
                                                <Input placeholder={totaldep} style={{ height: "auto" }}type = "number"  id="tid2"  />
                                                <InputGroupAddon addonType="append"><Button color="site-primary" onClick={withdraw}>unstake</Button></InputGroupAddon>
                                            </InputGroup>
                                            <div className="percentage smaller">
                                                <div className="percentage-item"onClick={withdrawbalancepercent}>25%</div>
                                                <div className="percentage-item"onClick={withdrawbalancepercent1}>50%</div>
                                                <div className="percentage-item"onClick={withdrawbalancepercent2}>75%</div>
                                                <div className="percentage-item"onClick={withdrawbalancepercent3}>100%</div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                                <Container>
                                    <Row className="justify-content-center">
                                        <Col xl="9">
                                            <Row className="mt-4">
                                                <Col xl="6" md="12">
                                                    <Button color="outline-site-primary" block onClick={claimreward}>claim reward</Button>
                                                </Col>
                                                <Col xl="6" md="12" className='mt-3 mt-xl-0'>
                                                    <Button color="outline-site-primary" block  onClick={emergencywithdraw} >Exit</Button>
                                                </Col>
                                            </Row>

                                        </Col>
                                    </Row>
                                </Container>
                                </div>
)
):
(
(
<div><center><Button color="site-primary" onClick={approve}>Approve</Button></center>

</div>
)
)}
  </div> 
                            </div>
                        </Card>
                    </Col>
                </Row>
 </Container>
        </section>
    );
}

export default Blackstake;