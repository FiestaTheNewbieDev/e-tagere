import { AppConfig } from '@mytypes/config';
import { app } from 'electron';
import fs from 'fs';

export default class ConfigService {
	private static instance: ConfigService;
	private configPath: string;
	private config: AppConfig;

	private defaultConfig: AppConfig = {
		theme: 'light',
		locale: 'en-US',
	};

	private constructor() {
		const userDataPath = app.getPath('userData');
		this.configPath = `${userDataPath}/config.json`;

		this.config = this.loadConfig();
	}

	public static getInstance(): ConfigService {
		if (!ConfigService.instance) {
			ConfigService.instance = new ConfigService();
		}
		return ConfigService.instance;
	}

	private loadConfig(): AppConfig {
		try {
			if (fs.existsSync(this.configPath)) {
				const rawData = fs.readFileSync(this.configPath, 'utf-8');
				return JSON.parse(rawData) as AppConfig;
			} else {
				this.saveConfig(this.defaultConfig);
				return this.defaultConfig;
			}
		} catch (error) {
			return this.defaultConfig;
		}
	}

	private saveConfig(config: AppConfig): void {
		try {
			fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
		} catch (error) {
			throw new Error('Failed to save config file');
		}
	}

	public get<Key extends keyof AppConfig>(key: Key): AppConfig[Key] {
		return this.config[key];
	}

	public set<Key extends keyof AppConfig>(
		key: Key,
		value: AppConfig[Key],
	): void {
		this.config[key] = value;
		this.saveConfig(this.config);
	}
}
