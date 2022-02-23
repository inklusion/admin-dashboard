const baseUri = `https://localhost:5001/`;
const storageBaseUri = `https://prummo-bucket.s3-eu-west-1.amazonaws.com/`;

export const environment = {
  production: false,
  apiURL: `${baseUri}api/`,
  teamStorage: `${storageBaseUri}team/`,
  empreendimentos: `${storageBaseUri}empreendimentos/`,
  gestaoImoveis: `${storageBaseUri}gestaoImoveis/`,
  investimento: `${storageBaseUri}investimento/`,
  obras: `${storageBaseUri}obras/`,
  quemSomos: `${storageBaseUri}quemSomos/`,
  news: `${storageBaseUri}news/`,
  portfolio: `${storageBaseUri}portfolio/`,
  videoStorage: `${storageBaseUri}video/`,
  homeStorage: `${storageBaseUri}home/`,
  blog: `/blog/`,

};
