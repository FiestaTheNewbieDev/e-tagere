import { AppConfig } from '@myTypes/config';
import { ipcRenderer } from 'electron';

export type ConfigAPI = {
	get: typeof get;
	set: typeof set;
};

const get = async <Key extends keyof AppConfig>(key: Key) =>
	ipcRenderer.invoke('config:get', key);
const set = async <Key extends keyof AppConfig>(
	key: Key,
	value: AppConfig[Key],
) => ipcRenderer.invoke('config:set', key, value);

const configAPI: ConfigAPI = {
	get,
	set,
};

export default configAPI;
