import configAPI, { ConfigAPI } from '@preload/configAPI';
import dialogAPI, { DialogAPI } from '@preload/dialogAPI';
import i18nAPI, { I18nAPI } from '@preload/i18nAPI';
import libraryAPI, { LibraryAPI } from '@preload/libraryAPI';
import { contextBridge } from 'electron';

export type ElectronAPI = {
	config: ConfigAPI;
	dialog: DialogAPI;
	i18n: I18nAPI;
	library: LibraryAPI;
};

const electronAPI: ElectronAPI = {
	config: configAPI,
	dialog: dialogAPI,
	i18n: i18nAPI,
	library: libraryAPI,
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
