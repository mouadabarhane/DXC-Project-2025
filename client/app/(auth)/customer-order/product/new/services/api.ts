// const INSTANCE_LOGIN = process.env.NEXT_PUBLIC_INSTANCE_LOGIN;
// const INSTANCE_PASSWORD = process.env.NEXT_PUBLIC_INSTANCE_URL;
const INSTANCE_TOKEN = process.env.NEXT_PUBLIC_INSTANCE_TOKEN;
const INSTANCE_URL = process.env.NEXT_PUBLIC_INSTANCE_URL;

export const url = `${INSTANCE_URL}/api`;

// const base64Auth = btoa(`${INSTANCE_LOGIN} ${INSTANCE_PASSWORD}`);
// const Authorization = `Basic ${base64Auth}`; // basic auth
const Authorization = `Bearer ${INSTANCE_TOKEN}`; // oauth

export const getHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization,
    "Access-Control-Allow-Origin": [INSTANCE_URL] as Array<string>,
  };
};
