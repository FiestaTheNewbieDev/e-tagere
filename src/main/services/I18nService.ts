import { Locale, LocaleCode } from '@myTypes/locale';

const DEFAULT_LOCALE_CODE: LocaleCode = 'en-US';

type Translations = {
	[key: string]: string | Translations;
};

export default class I18nService {
	private static instance: I18nService;
	private localeCode: LocaleCode = 'en-US';
	private parsedTranslations: Translations = {};

	public static getInstance(): I18nService {
		if (!I18nService.instance) {
			I18nService.instance = new I18nService();
		}
		return I18nService.instance;
	}

	private async parseTranslations(): Promise<void> {
		try {
			const [defaultLocale, locale] = await Promise.all([
				import(`@assets/locales/${DEFAULT_LOCALE_CODE}.json`),
				import(`@assets/locales/${this.localeCode}.json`),
			]);

			this.parsedTranslations = { ...defaultLocale, ...locale };
		} catch (error) {
			return Promise.reject(error);
		}
	}

	public async setLocale(
		locale: LocaleCode | Locale<LocaleCode>,
	): Promise<void> {
		if (typeof locale === 'string') {
			this.localeCode = locale;
		} else {
			this.localeCode = locale.code;
		}

		await this.parseTranslations();
	}

	public getTranslation(key: string): string {
		const translation = this.parsedTranslations[key];
		if (typeof translation === 'string') {
			return translation;
		}
		return key;
	}
}
