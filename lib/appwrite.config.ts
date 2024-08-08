import * as sdk from 'node-appwrite';

export const {
    PROJECT_ID, API_KEY, DATABSE_ID, PATIENT_COLLECTION_ID, DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: NEXT_PUBLIC_BUCKET_ID,
    NEXT_PUBLIC_ENDPOINT: ENDPOINT
} = process.env;

const client = new sdk.Client();

client
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(API_KEY!);

export const databses = new sdk.Databases(client);
export const storage = new sdk.Databases(client);
export const messaging = new sdk.Databases(client);
export const users = new sdk.Databases(client);
