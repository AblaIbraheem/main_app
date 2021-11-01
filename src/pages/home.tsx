import React, { Fragment, useEffect, useState,useRef } from "react";
import Borrow from "./borrow";
import Invest from "./invest";
import Repaid from "./repaid";
import Ignored from "./ignored";
import { Row, Col, Tabs, Tab, Spinner } from "react-bootstrap";
import strings from "../localization/localization";
import Footer from "../components/footer";
import { getLoanInfo, getProposalsByUserAddress } from '../API/api'
import  { useOutsideAlerter  } from '../Helpers'

// home page holder
function Home() {
  const [investText, setInvestText] = useState("");
  const [borrowText, setBorrowText] = useState("");
  const [repaidText, setRepaidText] = useState("");
  const [ignoredText, setIgnoredText] = useState("");
  const [selectedKey, setSelectedKey] = useState("borrow");
  const [loadProposals, setLoadProposals] = useState(false);
  const [callSpinnerFlag, setCallSpinnerFlag] = useState(false);
  const [totalFunded , setTotalFunded] = useState(0)
  const [totalRepaid , setTotalRepaid] = useState(0)
  const [proposals, setProposals] = useState([]);
  useEffect(() => {
    (async () => {
      const language: any = localStorage.getItem("language");
      if (language) {
        //set the localization static headers value
        strings.setLanguage(language);
        setInvestText(strings.invest);
        setBorrowText(strings.borrow);
        setRepaidText(strings.repaid);
        setIgnoredText(strings.ignored);
      }
      getProposals()
    })();
  }, []);
  let _user:any={}
  const getProposals = async () => {
    setLoadProposals(true);
    let data = localStorage.getItem('userData');
    if(data){
      _user=JSON.parse(data);
    }
        // get loan total record from db 
    const response: any = await getLoanInfo(_user.id)
    if (response) {
      if (response.success) {
        setTotalFunded(response.data.funded.amount)
        setTotalRepaid(response.data.paid)
      } else {
      }
    }
    //fetch proposals by user id
    const proposals: any = await getProposalsByUserAddress(_user.id,_user.id)
    // filter proposals by status repaid 
    //console.log(proposals)
    setProposals(proposals.data);
    setLoadProposals(false);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  const handleCallSpinner=async()=>{
    await getProposals();
  setCallSpinnerFlag(!callSpinnerFlag);
  }
  // this func to clear state after switching between demo and use the normal state
  const removeClass = () => {
    let tooltip = document.getElementsByClassName("dln-poppver-tooltip");
    if (tooltip) {
      for (var ele of tooltip) {
        ele.classList.add("d-none");
        ele.classList.remove("show");
      }
    }
  };
  // switch between tabs
  const handleSelectTab = (key, e) => {
    setSelectedKey(key);
    removeClass()
  }
  return (
    <Fragment>
      {loadProposals ? (
        <Row>
          <Col>
            <div className="app-page-loader py-5">
              <div className="dln-spinner-body pt-0 ">
                <Spinner
                  className="mr-1 app-page-spinner"
                  as="span"
                  animation="border"
                  role="status"
                  aria-hidden="true"
                />
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <div ref={wrapperRef}>
          <Row className="justify-content-center app-nav-containers">
            <Col xl={7} lg={7} md={7} sm={12}>
              <Tabs
                defaultActiveKey="borrow"
                transition={false}
                id="noanim-tab-example"
                className="app-nav-tabs d-flex justify-content-around"
                onSelect={(key, e) => handleSelectTab(key, e)}
              >
                <Tab eventKey="borrow" title={borrowText}>
                  {selectedKey === "borrow" && <Borrow handleCallSpinner={handleCallSpinner} passProposals={proposals} totalFunded={totalFunded} totalRepaid={totalRepaid}/>}
                </Tab>

                <Tab eventKey="repaid" title={repaidText}>
                  {selectedKey === "repaid" && <Repaid  handleCallSpinner={handleCallSpinner} passProposals={proposals} totalFunded={totalFunded} totalRepaid={totalRepaid}/>}
                </Tab>
                <Tab eventKey="invest" title={investText}>
                  {selectedKey === "invest" && <Invest />}
                </Tab>
                <Tab eventKey="ignored" title={ignoredText}>
                  {selectedKey === "ignored" && <Ignored />}
                </Tab>
              </Tabs>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col xl={7} lg={7} md={7} sm={12}>
              <Footer />
            </Col>
          </Row>
        </div>
      )}
    </Fragment>
  );
}
export default Home;
