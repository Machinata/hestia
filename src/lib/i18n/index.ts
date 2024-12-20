import * as runtime from '$lib/paraglide/runtime';
import { createI18n } from '@inlang/paraglide-sveltekit';
export * as messages from '$lib/paraglide/messages';
export const i18n = createI18n(runtime);
