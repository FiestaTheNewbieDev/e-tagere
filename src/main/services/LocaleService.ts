import { Locale, LocaleCode, Locales } from '@myTypes/locale';
import ConfigService from '@services/ConfigService';
import I18nService from '@services/I18nService';
import AbstractSingleton from '@utils/AbstractSingleton';
import LOCALES from '@utils/locales';

export default class LocaleService extends AbstractSingleton {
	private configService: ConfigService;
	private i18nService: I18nService;
	private locale: Locale<LocaleCode> = LOCALES['en-US'];

	constructor() {
		super();

		this.configService = ConfigService.getInstance();
		this.i18nService = I18nService.getInstance();

		this.setLocaleByCode(this.configService.get('locale'));
	}

	public static getInstance(): LocaleService {
		return LocaleService._getInstance<LocaleService>();
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
