import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "x8w7u90i",
  dataset: "production",
  apiVersion: "2022-07-07",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
