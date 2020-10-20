import React, { useState } from "react";
import { Dropdown, Input } from "semantic-ui-react";

import CountryList from "./countryList";

const Calculator = () => {

  const countryList = new CountryList();

  let [region, setRegion] = useState(undefined);
  let [country, setCountry] = useState(undefined);

  const action = () => {
    console.log("value", region);
   
  };

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
      <Input placeholder={placeholder} onChange={action} />
    </div>
  );
};

export default Calculator;
