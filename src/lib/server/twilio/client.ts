import { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from '$env/static/private';
import twilio from 'twilio';

export const TwilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
