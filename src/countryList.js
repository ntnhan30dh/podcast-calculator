class CountryList {
  constructor() {
    this.regions = this.regions.bind(this);
    this.countries = this.countries.bind(this);
  }
  regions = () => {
    
    let res = [
      { key: "Latam", value: "Latam", text: "Latam" },
      { key: "Nordics", value: "Nordics", text: "Nordics" },
      { key: "Asia", value: "Asia", text: "Asia" },
      { key: "Mena", value: "Mena", text: "Mena" },
      { key: "CEE", value: "CEE", text: "CEE" },
    ];
    return res;
  };
  countries = (region) => {
    let names =[];
      switch(region) {
          case "Latam":
              names = ["Argentina",
                "Bolivia",
                "Chile",
                "Dominican Republic",
                "Panama",
                "Paraguay",
                "Uruguay",
                "Venezuela"]
              break
              case "Mena":
                names = ["Egypt",
                    "Jordan",
                    "Kuwait",
                    "Oman",
                    "Qatar",
                    "Saudi Arabia",
                    "Turkey",
                    "UAE"]
                break
                case "Asia":
                names = ["Bangladesh",
                    "Cambodia",
                    "Hong Kong",
                    "Japan",
                    "Korea",
                    "Laos",
                    "Malaysia",
                    "Myanmar",
                    "Pakistan",
                    "Philippines",
                    "Singapore",
                    "Taiwan",
                    "Thailand"]
                break
                case "Nordics":
                    names = ["Austria",
                        "Bulgaria",
                        "Czech Republic",
                        "Finland",
                        "Greece",
                        "Hungary",
                        "Norway",
                        "Romania",
                        "Sweden"]
                    break
                    case "CEE":
                        names = ["Bosnia and Herzegovina",
                            "Croatia",
                            "Cyprus",
                            "Montenegro",
                            "Serbia"]
                        break
      default :
      names = [
        "Austria",
        "Bahrain",
        "Bangladesh",
        "Bolivia",
        "Bosnia and Herzegovina",
        "Bulgaria",
        "Cambodia",
        "Chile",
        "Colombia",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Dominican Republic",
        "Egypt",
        "Finland",
        "Greece",
        "Hong Kong",
        "Hungary",
        "Japan",
        "Jordan",
        "Kuwait",
        "Laos",
        "Malaysia",
        "Montenegro",
        "Myanmar",
        "Norway",
        "Oman",
        "Pakistan",
        "Panama",
        "Paraguay",
        "Philippines",
        "Qatar",
        "Romania",
        "Saudi Arabia",
        "Serbia",
        "Singapore",
        "South Korea",
        "Sweden",
        "Taiwan",
        "Thailand",
        "Turkey",
        "UAE",
        "Uruguay",
      ]
      }
    let res = [];
    names.map(name=>( res.push({
            key: name, value: name, text: name
        })
    

    ))
    return res;
  };

  ratio = (bannerType, orientaion) => {
    let res = [];
    switch (bannerType) {
      case "Paid social":
        if (orientaion === "landscape") {
          res = ["9:16"];
        }
        break;
      default:
        res = [];
    }
    return res;
  };
}
export default CountryList;