import ukPath from "./uk-path.json";
import czPath from "./cz-path.json";
import dePath from "./de-path.json";

const common = {
  pilotFeatures: [
    "Three researched opportunities each week",
    "Every opportunity personally reviewed",
    "One deeper project investigation during the pilot",
    "No long-term commitment",
    "Continue only if useful",
  ],
};

export const markets = {
  uk: {
    ...common,
    id: "uk",
    country: "UK",
    adjective: "UK",
    countryLong: "United Kingdom",
    prefix: "",
    locale: "en_GB",
    descriptor: "Project Intelligence for UK HVAC Contractors",
    pilotPrice: "£199 total — 4-week pilot",
    projectValue: "£30m",
    projectTitle: "£30m Hotel Restoration",
    projectWord: "restoration",
    sampleLocation: "South Croydon, Greater London",
    sampleCity: "South Croydon",
    map: {
      path: ukPath,
      viewBox: "0 0 470 655",
      projection: ([lon, lat]) => [(lon + 8.8) * 39 + 30, (59.7 - lat) * 65 + 15],
      labels: [
        ["SCOTLAND", 149, 224], ["ENGLAND", 294, 418],
        ["WALES", 126, 494], ["NORTHERN", 4, 315], ["IRELAND", 4, 329],
      ],
      locations: [
        ["Inverness", -4.22, 57.48], ["Aberdeen", -2.09, 57.15],
        ["Dundee", -2.97, 56.46], ["Glasgow", -4.25, 55.86],
        ["Edinburgh", -3.19, 55.95], ["Newcastle", -1.61, 54.98],
        ["Carlisle", -2.94, 54.89], ["York", -1.08, 53.96],
        ["Leeds", -1.55, 53.8], ["Liverpool", -2.98, 53.41],
        ["Manchester", -2.24, 53.48], ["Sheffield", -1.47, 53.38],
        ["Nottingham", -1.15, 52.95], ["Birmingham", -1.9, 52.49],
        ["Leicester", -1.13, 52.64], ["Norwich", 1.3, 52.63],
        ["Cambridge", 0.12, 52.21], ["Oxford", -1.26, 51.75],
        ["Cardiff", -3.18, 51.48], ["Swansea", -3.94, 51.62],
        ["Bristol", -2.59, 51.45], ["South Croydon", -0.09, 51.35],
        ["Southampton", -1.4, 50.91], ["Exeter", -3.53, 50.72],
      ],
      demos: {
        Manchester: ["Hotel refurbishment", "£18m illustrative project", "Potential mechanical package"],
        Birmingham: ["Care home expansion", "Illustrative planning-stage project", "Heating and ventilation review"],
        "South Croydon": ["Hotel restoration", "£30m illustrative project", "Potential heating replacement"],
        Edinburgh: ["Office refurbishment", "Illustrative commercial project", "Building services assessment"],
      },
      // Illustrative details for the map preview. They name no client, contractor, procurement status or package value.
      details: {
        Manchester: {
          sector: "Hospitality",
          checks: ["Condition of the existing plant", "Ventilation of kitchens and shared areas", "Controls and commissioning"],
        },
        Birmingham: {
          sector: "Healthcare and care",
          checks: ["Heating and hot water for the extension", "Ventilation and comfort", "Controls and commissioning"],
        },
        "South Croydon": {
          sector: "Hospitality",
          checks: ["Heating plant and distribution", "Hot water demand and storage", "Ventilation of shared areas"],
          href: "/sample-opportunity/",
        },
        Edinburgh: {
          sector: "Commercial office",
          checks: ["Condition of the existing plant", "Cooling and ventilation loads", "Scope of a controls upgrade"],
        },
      },
      featuredCity: "Manchester",
    },
  },
  cz: {
    ...common,
    id: "cz",
    country: "Czech Republic",
    adjective: "Czech",
    countryLong: "Czech Republic",
    prefix: "/cz",
    locale: "en_CZ",
    descriptor: "Project Intelligence for Czech HVAC Contractors",
    pilotPrice: "5,700 Kč total — 4-week pilot",
    projectValue: "860m Kč",
    projectTitle: "860m Kč Hotel Restoration",
    projectWord: "restoration",
    sampleLocation: "Prague, Czech Republic",
    sampleCity: "Prague",
    map: {
      path: czPath,
      viewBox: "6 22 624 356",
      projection: ([lon, lat]) => [(lon - 12) * 87 + 20, (51.2 - lat) * 135 + 15],
      labels: [["CZECH REPUBLIC", 245, 225]],
      locations: [
        ["Prague", 14.4378, 50.0755], ["Brno", 16.6068, 49.1951],
        ["Ostrava", 18.2625, 49.8209], ["Plzeň", 13.3776, 49.7384],
        ["Liberec", 15.0562, 50.7663], ["Olomouc", 17.2509, 49.5938],
        ["České Budějovice", 14.4747, 48.9745], ["Hradec Králové", 15.8328, 50.2092],
        ["Pardubice", 15.7812, 50.0343], ["Zlín", 17.6663, 49.2244],
      ],
      demos: {
        Prague: ["Hotel restoration", "860m Kč illustrative project", "Potential heating replacement"],
        Brno: ["Office refurbishment", "520m Kč illustrative project", "Building services assessment"],
        Ostrava: ["Industrial facility upgrade", "Illustrative commercial project", "Heating and ventilation review"],
        "Plzeň": ["Care home expansion", "Illustrative planning-stage project", "Potential mechanical package"],
      },
      // Illustrative details for the map preview. They name no client, contractor, procurement status or package value.
      details: {
        Prague: {
          sector: "Hospitality",
          checks: ["Heating plant and distribution", "Hot water demand and storage", "Ventilation of shared areas"],
          href: "/sample-opportunity/",
        },
        Brno: {
          sector: "Commercial office",
          checks: ["Condition of the existing plant", "Cooling and ventilation loads", "Scope of a controls upgrade"],
        },
        Ostrava: {
          sector: "Industrial",
          checks: ["Process heat and ventilation", "Extraction and make-up air", "Plant access and shutdown windows"],
        },
        "Plzeň": {
          sector: "Healthcare and care",
          checks: ["Heating and hot water for the new wing", "Ventilation and comfort", "Controls and commissioning"],
        },
      },
      labelsLeft: ["Plzeň", "Ostrava"],
      featuredCity: "Prague",
    },
  },
  de: {
    ...common,
    id: "de",
    country: "Germany",
    adjective: "German",
    countryLong: "Germany",
    prefix: "/de",
    locale: "en_DE",
    descriptor: "Project Intelligence for German HVAC Contractors",
    pilotPrice: "€229 total — 4-week pilot",
    projectValue: "€35m",
    projectTitle: "€35m Hotel Redevelopment",
    projectWord: "redevelopment",
    sampleLocation: "Berlin, Germany",
    sampleCity: "Berlin",
    map: {
      path: dePath,
      viewBox: "0 0 490 655",
      projection: ([lon, lat]) => [(lon - 5.5) * 48 + 15, (55.3 - lat) * 78 + 15],
      labels: [["GERMANY", 190, 350]],
      locations: [
        ["Berlin", 13.405, 52.52], ["Hamburg", 9.9937, 53.5511],
        ["Munich", 11.582, 48.1351], ["Cologne", 6.9603, 50.9375],
        ["Frankfurt", 8.6821, 50.1109], ["Stuttgart", 9.1829, 48.7758],
        ["Düsseldorf", 6.7735, 51.2277], ["Leipzig", 12.3731, 51.3397],
        ["Dortmund", 7.4653, 51.5136], ["Nuremberg", 11.0767, 49.4521],
        ["Bremen", 8.8017, 53.0793], ["Dresden", 13.7373, 51.0504],
      ],
      demos: {
        Berlin: ["Hotel redevelopment", "€35m illustrative project", "Potential heating replacement"],
        Hamburg: ["Office refurbishment", "€24m illustrative project", "Building services assessment"],
        Munich: ["Mixed-use development", "Illustrative planning-stage project", "Potential mechanical package"],
        Frankfurt: ["Commercial tower upgrade", "Illustrative commercial project", "Heating and ventilation review"],
      },
      // Illustrative details for the map preview. They name no client, contractor, procurement status or package value.
      details: {
        Berlin: {
          sector: "Hospitality",
          checks: ["Heating plant and distribution", "Hot water demand and storage", "Ventilation of shared areas"],
          href: "/sample-opportunity/",
        },
        Hamburg: {
          sector: "Commercial office",
          checks: ["Condition of the existing plant", "Cooling and ventilation loads", "Scope of a controls upgrade"],
        },
        Munich: {
          sector: "Mixed use",
          checks: ["Heating and cooling strategy for each use", "Ventilation for retail and residential areas", "Controls and metering"],
        },
        Frankfurt: {
          sector: "Commercial office",
          checks: ["Condition of the existing plant", "Cooling and ventilation loads", "Scope of a controls upgrade"],
        },
      },
      featuredCity: "Berlin",
    },
  },
};

export const marketPath = (market, path = "/") =>
  `${market.prefix}${path === "/" ? "/" : path}`;

export const equivalentMarketPath = (market, pathname) => {
  const clean = pathname.replace(/^\/(cz|de)(?=\/|$)/, "") || "/";
  const supported = ["/", "/sample-opportunity/", "/about/", "/contact/"];
  return marketPath(market, supported.includes(clean) ? clean : "/");
};

export const getMarket = (id = "uk") => markets[id] || markets.uk;
