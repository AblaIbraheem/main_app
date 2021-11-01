import React, { Fragment, useState, useEffect } from "react";
import { Row, Col, Spinner } from "react-bootstrap";
import bankIcon from "../Assets/Images/icons/bank.png";
import SingleProposal from "../components/singleProposal";
import strings from "../localization/localization";

function Repaid({handleCallSpinner , passProposals, totalFunded , totalRepaid}) {;
  const [proposals, setProposals] = useState(passProposals.filter(item=>item.status===6));
  const [loadProposals, setLoadProposals] = useState(false);

  useEffect(() => {
    (async () => {
      const language: any = localStorage.getItem("language");
      if (language) {
        strings.setLanguage(language);
      }
    })();
  }, []);

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
        <div>
          <Row className="justify-content-center app-inner-page app-inner-page-tab" >
            <Col xl={12} lg={12} md={12} sm={12} className="card app-card">
              <div className="app-card-title d-flex align-self-center mt-3 justify-content-center">
                <h3>{strings.loanInformation}</h3>
              </div>
              <Row>
                <Col className="align-self-center text-left">
                  <p className="my-2 app-label-with-icon">
                    <img src={bankIcon} alt="bank" />
                    <span className="pl-1 mb-2">{strings.totalFunded}</span>
                  </p>
                </Col>
                <Col className="align-self-center text-right col-auto">
                  <span className="app-text-blue font-weight-bolder mr-1">
                    {totalFunded} 
                  </span>
                  <span className="app-currency-label">$</span>
                </Col>
              </Row>
              <Row>
                <Col className="align-self-center text-left">
                  <p className="app-label-with-icon">
                    <img src={bankIcon} alt="bank" />
                    <span className="pl-1 mb-2">{strings.totalRepaid}</span>
                  </p>
                </Col>
                <Col className="align-self-center text-right col-auto">
                  <span className="app-text-blue font-weight-bolder mr-1">
                    {totalRepaid}
                  </span>
                  <span className="app-currency-label">$</span>
                </Col>
              </Row>
            </Col>
          </Row>
     
          {proposals &&
            proposals.map((p: any, index) => (
              <Row key={index}>
                <Col>
                  <SingleProposal
                    data={p}
                    callSpinner={handleCallSpinner}
                    CallAddProposalCanceled=""
                    isBorrow={true}
                  />
                </Col>
              </Row>
            ))}
                   {proposals&&proposals.length<=0 &&
               
               <Row className='mt-5'>
                 <Col>
                 <h4>{strings.noDataToShow}</h4>
                 </Col>
               </Row>
             }
        </div>
      )}
    </Fragment>
  );
}
export default Repaid;
