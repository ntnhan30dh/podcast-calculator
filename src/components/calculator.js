import React, { useState, useEffect } from "react";
import { Form, Dropdown, Input, Radio, Label } from "semantic-ui-react";

import CountryList from "../constants/countryList";
import Reach from "../constants/aReach";
import Payment from "../constants/paymentModel";

const Calculator = () => {
  const countryList = new CountryList();
  const aReach = new Reach();
  const payment = new Payment();

  // const payments = [
  //   { key: "cpm", value: "cpm", text: "CPM" },
  //   { key: "cpa", value: "cpa", text: "CPA" },
  // ];
  // const format = [
  //   { key: "Host-read", value: "Host-read", text: "Host-read" },
  //   { key: "pre-recorded", value: "pre-recorded", text: "pre-recorded" },
  // ];

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
    <Form>
      <div className="contentWrapper">
        <div className="inputFlield">
          <h3> Region</h3>
          <Dropdown
            placeholder="Select Region"
            fluid
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
              fluid
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
          {/* <Dropdown
        placeholder="Payment model"
        // fluid
        selection
        options={payments}
        onChange={(e, { value }) => setPaymentModel(value)}
      /> */}
          <div className="radios">
            <Form.Field>
              <Radio
                className={paymentModel === "cpm" ? "active" : ""}
                label="CPM"
                name="radioGroup"
                value="cpm"
                checked={paymentModel === "cpm"}
                onChange={(e, { value }) => setPaymentModel(value)}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className={paymentModel === "cpa" ? "active" : ""}
                label="CPA"
                name="radioGroup"
                value="cpa"
                checked={paymentModel === "cpa"}
                onChange={(e, { value }) => setPaymentModel(value)}
              />
            </Form.Field>
          </div>
          {isChecking && !paymentModel && (
            <Label style={{ color: "red" }} basic color="red" pointing="left">
              please choose Payment model
            </Label>
          )}
          <h3>Ad format</h3>
          {/* <h4>{adFormat}</h4> */}
          {/* <Dropdown
        placeholder="Ad format"
        fluid
        selection
        options={format}
        onChange={(e, { value }) =>
          value === "Host-read" ? setAdFormat(1) : setAdFormat(0.8)
        }
      /> */}
          <div className="radios">
            <Form.Field>
              <Radio
                className={adFormat === 1 ? "active" : ""}
                label="Host-read"
                name="radioGroup1"
                value="Host-read"
                checked={adFormat === 1}
                onChange={(e, { value }) => setAdFormat(1)}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                className={adFormat === 0.8 ? "active" : ""}
                label="Pre-Recorded"
                name="radioGroup1"
                value="pre-recorded"
                checked={adFormat === 0.8}
                onChange={(e, { value }) => setAdFormat(0.8)}
              />
            </Form.Field>
          </div>
          {isChecking && !adFormat && (
            <Label style={{ color: "red" }} basic color="red" pointing="left">
              please choose Ad format
            </Label>
          )}

          {paymentModel === "cpm" && <h3>Reach</h3>}
          {/* <h4>{reach}</h4> */}
          {paymentModel === "cpm" && (
            <Input
              fluid
              type="number"
              onChange={(e, { value }) => setReach(value)}
            />
          )}
          {!/^[0-9.]*$/.test(reach) && reach && (
            <Label basic color="red" pointing="left">
              Please enter a number
            </Label>
          )}
          {isChecking && !reach && paymentModel === "cpm" && (
            <Label style={{ color: "red" }} basic color="red" pointing="left">
              please enter Reach
            </Label>
          )}

          <h3>Number of spots</h3>
          {/* <h4>{spot}</h4> */}
          {/* <Input type='number' onChange={(e, { value }) => handelSetSpot(value)} /> */}
          <Input
            //inputmode="numeric" pattern="[0-9]*"
            fluid
            type="number"
            onChange={(e, { value }) => setSpot(value)}
          />
          {!/^\d+$/.test(spot) && spot && (
            <Label basic color="red" pointing="left">
              Please enter a valid number
            </Label>
          )}
        </div>
        <div className="result">
          {paymentModel === "cpm" && <h1> AVERAGE LISTENERS</h1>}
          {paymentModel === "cpm" && (
            <div className="aveListeners">
              <div className="part">
                <h3>Monthly</h3>
                <h4>
                  {" "}
                  {country &&
                    aReach.aReachArr()[country] &&
                    aReach.aReachArr()[country].monthly}
                </h4>
              </div>
              <div className="part">
                <h3>Weekly</h3>
                <h4>
                  {country &&
                    aReach.aReachArr()[country] &&
                    aReach.aReachArr()[country].weekly}
                </h4>
              </div>
            </div>
          )}

          <h1>
            ESTIMATED COST
            <h2>
              {country &&
                paymentModel &&
                spot &&
                adFormat &&
                formatter.format(cost)}
            </h2>
          </h1>
        </div>
      </div>
    </Form>
  );
};

export default Calculator;
