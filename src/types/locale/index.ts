export type LocaleCode = 'en-US' | 'fr-FR';

export type Locale<Key extends LocaleCode> = {
	code: Key;
	emoji?: string;
};

export type Locales = {
	[Key in LocaleCode]: Locale<Key>;
};
