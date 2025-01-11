import configAPI, { ConfigAPI } from '@preload/configAPI';
import dialogAPI, { DialogAPI } from '@preload/dialogAPI';
import { contextBridge } from 'electron';

export type ElectronAPI = {
	config: ConfigAPI;
	dialog: DialogAPI;
};

const electronAPI = {
	config: configAPI,
	dialog: dialogAPI,
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
