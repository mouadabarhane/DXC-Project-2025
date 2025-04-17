// Anass: I added this code to make sure servicenow instance is connected :)

import { Router, Request, Response } from 'express';
import axios from 'axios';

const router = Router();

interface ServiceNowCredentials {
  username: string;
  password: string;
}

const fetchServiceNowIncidents = async (credentials: ServiceNowCredentials) => {
  const serviceNowAPI = `${process.env.INSTANCE_URL}/api/now/table/incident`;
  try {
    const response = await axios.get(serviceNowAPI, {
      auth: {
        username: credentials.username,
        password: credentials.password,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

router.get('/check-servicenow-connection', async (req: Request, res: Response) => {
  try {
    const credentials: ServiceNowCredentials = {
      username: process.env.SERVICENOW_USERNAME || '',
      password: process.env.SERVICENOW_PASSWORD || '',
    };

    console.log('ServiceNow URL:', process.env.INSTANCE_URL);
    console.log('ServiceNow Username:', process.env.SERVICENOW_USERNAME);


    const response = await fetchServiceNowIncidents(credentials);

    if (response.status === 200) {
      console.log('Successfully connected to ServiceNow instance');
      res.status(200).json({ connected: true });
    } else {
      console.error('Failed to connect to ServiceNow instance:', response.status, response.statusText);
      res.status(500).json({ connected: false, message: 'Failed to connect to ServiceNow instance' });
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error connecting to ServiceNow:', error.message, error.response?.data || '');
    } else {
      console.error('Unexpected error:', error);
    }
    res.status(500).json({ connected: false, message: 'Failed to connect to ServiceNow instance', error: error.message });
  }
});

export default router;
