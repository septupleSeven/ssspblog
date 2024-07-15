import axios from "axios";

interface getNotionParams {
  method: string;
  type: string;
  id: string;
  params?: string;
  option?: string;
  isProperty?: string;
}

export default async function getNotion({
  method,
  type,
  id,
  params = "",
  option = "",
  isProperty = "",
}: getNotionParams) {
  const url = `https://api.notion.com/v1/${type}/${id}/${params}${option ? `?${option}` : ""}`;

  const config = {
    method: method,
    url: url,
    headers: {
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
    },
  };

  const response = await axios.request(config);

  if(isProperty){
    return response.data[isProperty];
  }

  return response.data;
}
