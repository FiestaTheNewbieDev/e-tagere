import ConfigService from '@main/services/ConfigService';
import I18nService from '@main/services/I18nService';
import { Locale, LocaleCode, Locales } from '@myTypes/locale';
import LOCALES from '@utils/locales';

export default class LocaleService {
	private static instance: LocaleService;
	private configService: ConfigService;
	private i18nService: I18nService;
	private locale: Locale<LocaleCode> = LOCALES['en-US'];

	private constructor() {
		this.configService = ConfigService.getInstance();
		this.i18nService = I18nService.getInstance();

		this.setLocaleByCode(this.configService.get('locale'));
	}

	public static getInstance(): LocaleService {
		if (!LocaleService.instance) {
			LocaleService.instance = new LocaleService();
		}
		return LocaleService.instance;
	}

	public getLocale(): Locale<LocaleCode> {
		return this.locale;
	}

	public setLocaleByCode(localeCode: LocaleCode): void {
		this.locale = LOCALES[localeCode];
		this.configService.set('locale', localeCode);
	}

	public setLocale(locale: Locale<LocaleCode>): void {
		this.locale = locale;
		this.configService.set('locale', locale.code);
		this.i18nService.setLocale(locale.code);
	}

	public getLocales(): Locales {
		return LOCALES;
	}

	public getLocalesArray(): Locale<LocaleCode>[] {
		return Object.values(LOCALES);
	}
}
