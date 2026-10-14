import { markets } from "./markets.js";

export const site = {
  name: "Atlas",
  descriptor: markets.uk.descriptor,
  url: process.env.SITE_URL || "",
  email: process.env.CONTACT_EMAIL || "",
};
export const routes = [
  "/", "/sample-opportunity/", "/about/", "/contact/",
  "/cz/", "/cz/sample-opportunity/", "/cz/about/", "/cz/contact/",
  "/de/", "/de/sample-opportunity/", "/de/about/", "/de/contact/",
];
