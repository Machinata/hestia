import twilio from 'twilio';
import { TwilioConfig } from './twilio.config';

export const client = twilio(TwilioConfig.twilio_account_sid, TwilioConfig.twilio_auth_token);