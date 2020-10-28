import React, { useState, useEffect } from "react";
import { Dropdown, Input, Label } from "semantic-ui-react";

import CountryList from "../constants/countryList";
import Reach from "../constants/aReach";
import Payment from "../constants/paymentModel";

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
  let [isChecking, setIsChecking] = useState(undefined);

  let paymentAtr =
    paymentModel === "cpa"
      ? payment.getPayment(paymentModel)[country]
      : payment.getPayment(paymentModel)[country] * reach * 0.001;
  let cost = spot * paymentAtr * adFormat;

  useEffect(() => {
    if (spot) {
      setIsChecking(true);
    }
  }, [spot]);

  useEffect(() => {
    setCountry(undefined);
  }, [region]);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  });
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
      {isChecking && !region && (
        <Label style={{ color: "red" }} basic color="red" pointing="left">
          please choose region
        </Label>
      )}
      {region && <h3>Country</h3>}
      {/* <h4>{country}</h4> */}
      {region && (
        <Dropdown
          placeholder="Select Country"
          // fluid
          search
          selection
          options={countryList.countries(region)}
          onChange={(e, { value }) => setCountry(value)}
        />
      )}
      {region && isChecking && !country && (
        <Label style={{ color: "red" }} basic color="red" pointing="left">
          please choose country
        </Label>
      )}
      <h3>Payment model</h3>
      {/* <h4>{paymentModel}</h4> */}
      {/* <h3>Payment number</h3> */}
      {/* <h4>
        {country && paymentModel && payment.getPayment(paymentModel)[country]}
      </h4> */}
      <Dropdown
        placeholder="Payment model"
        // fluid
        selection
        options={payments}
        onChange={(e, { value }) => setPaymentModel(value)}
      />
      {isChecking && !paymentModel && (
        <Label style={{ color: "red" }} basic color="red" pointing="left">
          please choose Payment model
        </Label>
      )}
      <h3>Ad format</h3>
      {/* <h4>{adFormat}</h4> */}
      <Dropdown
        placeholder="Ad format"
        // fluid
        selection
        options={format}
        onChange={(e, { value }) =>
          value === "Host-read" ? setAdFormat(1) : setAdFormat(0.8)
        }
      />
      {isChecking && !adFormat && (
        <Label style={{ color: "red" }} basic color="red" pointing="left">
          please choose Ad format
        </Label>
      )}
      {paymentModel === "cpm" && <h3>Reach</h3>}
      {/* <h4>{reach}</h4> */}
      {paymentModel === "cpm" && (
        <Input onChange={(e, { value }) => setReach(value)} />
      )}
      {!/^\d+$/.test(reach) && reach && (
        <Label basic color="red" pointing="left">
          Please enter a number
        </Label>
      )}
      {isChecking && !reach && paymentModel === "cpm" && (
        <Label style={{ color: "red" }} basic color="red" pointing="left">
          please enter Reach
        </Label>
      )}
      {paymentModel === "cpm" && (
        <h3>
          Average monthly listners:{" "}
          {country &&
            aReach.aReachArr()[country] &&
            aReach.aReachArr()[country].monthly}
        </h3>
      )}
      {paymentModel === "cpm" && (
        <h3>
          Average weekly listners:{" "}
          {country &&
            aReach.aReachArr()[country] &&
            aReach.aReachArr()[country].weekly}{" "}
        </h3>
      )}

      <h3>Number of spots</h3>
      {/* <h4>{spot}</h4> */}
      {/* <Input type='number' onChange={(e, { value }) => handelSetSpot(value)} /> */}
      <Input onChange={(e, { value }) => setSpot(value)} />
      {!/^\d+$/.test(spot) && spot && (
        <Label basic color="red" pointing="left">
          Please enter a number
        </Label>
      )}
      <h2>
        Estimated cost:{" "}
        {country && paymentModel && spot && adFormat && formatter.format(cost)}
      </h2>
    </div>
  );
};

export default Calculator;
