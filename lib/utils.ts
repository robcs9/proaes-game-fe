import { DynamoDBClient, } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

// export async function updateLocalGeojson() {
export async function getGeojson() {
  // Fetching geojson data from DynamoDB
  const AWS_ACCESS_KEY_ID = 'AWS_ACCESS_KEY_ID';
  const AWS_SECRET_ACCESS_KEY = 'AWS_SECRET_ACCESS_KEY';
  const AWS_REGION = 'AWS_REGION';
  // const AWS_ACCESS_KEY_ID = Deno.env.get('AWS_ACCESS_KEY_ID');
  // const AWS_SECRET_ACCESS_KEY = Deno.env.get('AWS_SECRET_ACCESS_KEY');
  // const AWS_REGION = Deno.env.get('AWS_REGION');
  const client = new DynamoDBClient({
    region: AWS_REGION,
    credentials: {
      accessKeyId: AWS_ACCESS_KEY_ID,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
  });
  const docClient = DynamoDBDocumentClient.from(client);
  const params = {
    TableName: 'geojson',
  };
  try {
    const res = await docClient.send(new ScanCommand(params));
    if(res['Items'] && res['Items'].length > 0) {
      // localStorage.setItem('geojson', res['Items'][0]['json']);
      // console.log(localStorage.getItem('geojson'))
      // console.log('Geojson stored successfully!');
      console.log('Geojson returned successfully!');
      return res['Items'][0]['json'];
    }
    console.log("DB scan couldn't retrieve any results");
  } catch(e) {
    console.log(`Error. Failed to retrieve geojson data from the db.\n${e}`);
  }
  return null;
}

export const getData = async () => {
  try {
    //const json = await fetch("./plot.json");
    // Retrieve data from api when it's available
    const url = 'https://proaes-game-be-scraper.onrender.com/api/v1';
    // const json = await fetch("/data.geojson");
    // const json = await fetch(`${url}/db/geojson`);
    
    // fetch geojson from internal api
    const json = await fetch("/api/geodata");
    
    //console.dir(await json.text())  
    if (!json.ok) throw new Error(`HTTP error! status: ${json.status}`);
    const data = await json.json();
    // check if data.data is valid before returning
    // console.log(data)
    localStorage.setItem('geojson', JSON.stringify(data));
    return data;
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};