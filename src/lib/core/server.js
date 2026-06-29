import { getUserToken } from "./session";
import { redirect } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

if (!baseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export const AuthHeader = async () => {
  const token = await getUserToken();
  const header = token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {};
  return header;
};

const HandleStatusCode = (res) => {
  if(res.status === 401){
    redirect("/unauthorized")
  }
  else if(res.status === 403){
    redirect("/forbidden")
  }
  return res.json()
}

export const serverFetch = async (path) => {
  const res = await fetch(`${baseUrl}${path}`);

  // if (!res.ok) {
  //   throw new Error(`API error: ${res.status}`);
  // }
  return res.json();
};

export const serverMutation = async (path, data = null, method = "POST") => {
  const fetchOptions = {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...(await AuthHeader()),
    },
  };

  if (data) {
    fetchOptions.body = JSON.stringify(data);
  }
  const res = await fetch(`${baseUrl}${path}`, fetchOptions);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

   return HandleStatusCode(res);;
};
