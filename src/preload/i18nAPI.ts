import { ipcRenderer } from 'electron';

export type I18nAPI = {
	get: typeof get;
};

const get = async (key: string): Promise<string> =>
	ipcRenderer.invoke('i18n:get', key);

const i18nAPI: I18nAPI = {
	get,
};

export default i18nAPI;
