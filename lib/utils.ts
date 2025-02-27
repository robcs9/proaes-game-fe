import { DynamoDBClient, } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

// export async function updateLocalGeojson() {
export async function getGeojson() {
  // Fetching geojson data from DynamoDB
  // AWS_ACCESS_KEY_ID
  // AWS_SECRET_ACCESS_KEY
  const AWS_ACCESS_KEY_ID = Deno.env.get('AWS_ACCESS_KEY_ID');
  const AWS_SECRET_ACCESS_KEY = Deno.env.get('AWS_SECRET_ACCESS_KEY');
  const AWS_REGION = Deno.env.get('AWS_REGION');
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
      return res['Items'][0]['json']
    }
    console.log("DB scan couldn't retrieve any results");
  } catch(e) {
    console.log(`Error. Failed to retrieve geojson data from the db.\n${e}`);
  }
  return null;
}
