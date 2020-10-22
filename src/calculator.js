import React, { useState } from "react";
import { Dropdown, Input } from "semantic-ui-react";

import CountryList from "./countryList";
import Reach from "./aReach";

const Calculator = () => {
  const countryList = new CountryList();
  const aReach = new Reach();

  const payment = [{ key: "CPM", value: "CPM", text: "CPM" },
  { key: "CPA", value: "CPA", text: "CPA" },]
  const format = [{ key: "Host-read", value: "Host-read", text: "Host-read" },
  { key: "pre-recorded", value: "pre-recorded", text: "pre-recorded" },]
  let cost = 0;

  let [region, setRegion] = useState(undefined);
  let [country, setCountry] = useState(undefined);
  let [paymentModel, setPaymentModel] = useState(undefined);
  let [adFormat, setAdFormat] = useState(undefined);
  let [reach, setReach] = useState(undefined);
  let [spot, setSpot] = useState(undefined);

//   const action =() =>{
//  aReach.transfer()
//  console.log(
//    "aReach.transfer()[country]",
//    aReach.transfer()[country]
// ,
//    aReach.transfer()[country].monthly
//  )
//   }

  const placeholder = "hehe";
  return (
    <div>
      <h1>Calculator</h1>
      <h3> Region</h3>
      <Dropdown
        placeholder="Select Region"
        fluid
        search
        selection
        options={countryList.regions()}
      //  onChange={action}
        onChange={(e, { value }) => setRegion(value)}
      />
      <h3>Country</h3>
      <h4>{country}</h4>
      <Dropdown
        placeholder="Select Country"
        fluid
        search
        selection
        options={countryList.countries(region)}
        onChange={(e, { value }) => setCountry(value)}
      />
      <h3>Reach</h3>
      <h4>{reach}</h4>
      <Input placeholder={placeholder}  onChange={(e, { value }) => setReach(value)}/>
      
      <h3>Average weekly listners: {country&&aReach.aReachArr()[country]&& aReach.aReachArr()[country].weekly} </h3>
      <h3>Average monthly listners:  {country&&aReach.aReachArr()[country]&& aReach.aReachArr()[country].monthly}</h3>

      <h3>Payment model</h3>
      <h4>{paymentModel}</h4>
      <Dropdown
        placeholder="Payment model"
        fluid
        selection
        options={payment}
        onChange={(e, { value }) => setPaymentModel(value)}
      />
      <h3>Ad format</h3>
      <h4>{adFormat}</h4>
      <Dropdown
        placeholder="Payment model"
        fluid
        selection
        options={format}
        onChange={(e, { value }) => setAdFormat(value)}
      />
      <h3>Number of spots</h3>
      <h4>{spot}</h4>
      <Input  onChange={(e, { value }) => setSpot(value)}/>

      <h2>Estimated cost: {cost}</h2>
    </div>
  );
};

export default Calculator;
