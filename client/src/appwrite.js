import { Client, Storage } from "appwrite";

export const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("679e1985002467e82cb6");

export const storage = new Storage(client);
