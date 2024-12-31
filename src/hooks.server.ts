import { TwilioConfig } from '$lib/server/twilio';
import twilio from 'twilio';

export async function handle({ event, resolve }) {
	const twilioConfig = TwilioConfig();
	const twilioClient = twilio(twilioConfig.twilio_account_sid, twilioConfig.twilio_auth_token);
	event.locals.twilio = {
		config: twilioConfig,
		client: twilioClient,
	};
	return await resolve(event);
}
