import React, { useState } from "react";
import { Dropdown, Input } from "semantic-ui-react";

import CountryList from "./countryList";
import Reach from "./aReach";
import Payment from "./paymentModel";

const Calculator = () => {
  const countryList = new CountryList();
  const aReach = new Reach();
  const payment = new Payment();

  const payments = [
    { key: "cpm", value: "cpm", text: "CPM" },
    { key: "cpa", value: "cpa", text: "CPA" },
  ];
  const format = [
    { key: "Host-read", value: "Host-read", text: "Host-read" },
    { key: "pre-recorded", value: "pre-recorded", text: "pre-recorded" },
  ];

  let [region, setRegion] = useState(undefined);
  let [country, setCountry] = useState(undefined);
  let [reach, setReach] = useState(undefined);
  let [paymentModel, setPaymentModel] = useState(undefined);
  let [adFormat, setAdFormat] = useState(undefined);
  let [spot, setSpot] = useState(undefined);

  let paymentAtr =
    paymentModel === "cpa"
      ? payment.getPayment(paymentModel)[country]
      : payment.getPayment(paymentModel)[country] * reach * 0.001;
  let cost = spot * paymentAtr * adFormat;

  const handelSetSpot = (value) => {
    if (!country) {
      alert("country is missing");
    }
     else if (!paymentModel) {
      alert("paymentModel is missing");
    } 
    else if (paymentModel==='cpm'&&!reach) {
      alert("reach is missing");
    } 
    else if (!adFormat) {
      alert("adFormat is missing");
    } 
    else setSpot(value);
  };
  return (
    <div>
      <h1>Calculator</h1>
      <h3> Region</h3>
      <Dropdown
        placeholder="Select Region"
        // fluid
        search
        selection
        options={countryList.regions()}
        // onChange={action}
        onChange={(e, { value }) => setRegion(value)}
      />
      <h3>Country</h3>
      <h4>{country}</h4>
      <Dropdown
        placeholder="Select Country"
        // fluid
        search
        selection
        options={countryList.countries(region)}
        onChange={(e, { value }) => setCountry(value)}
      />
      <h3>Reach</h3>
      <h4>{reach}</h4>
      <Input onChange={(e, { value }) => setReach(value)} />

      <h3>
        Average monthly listners:{" "}
        {country &&
          aReach.aReachArr()[country] &&
          aReach.aReachArr()[country].monthly}
      </h3>
      <h3>
        Average weekly listners:{" "}
        {country &&
          aReach.aReachArr()[country] &&
          aReach.aReachArr()[country].weekly}{" "}
      </h3>

      <h3>Payment model</h3>
      <h4>{paymentModel}</h4>
      <h3>Payment number</h3>
      <h4>
        {country && paymentModel && payment.getPayment(paymentModel)[country]}
      </h4>
      <Dropdown
        placeholder="Payment model"
        // fluid
        selection
        options={payments}
        onChange={(e, { value }) => setPaymentModel(value)}
      />
      <h3>Ad format</h3>
      <h4>{adFormat}</h4>
      <Dropdown
        placeholder="Ad format"
        // fluid
        selection
        options={format}
        onChange={(e, { value }) =>
          value === "Host-read" ? setAdFormat(1) : setAdFormat(0.8)
        }
      />
      <h3>Number of spots</h3>
      <h4>{spot}</h4>
      <Input onChange={(e, { value }) => handelSetSpot(value)} />

      <h2>
        Estimated cost: {country && paymentModel && spot && adFormat && cost}
      </h2>
    </div>
  );
};

export default Calculator;
