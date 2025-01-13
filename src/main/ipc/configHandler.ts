import ConfigService from "@main/services/ConfigService";
import { AppConfig } from "@myTypes/config";
import { ipcMain, IpcMainInvokeEvent } from "electron";

export function handleConfigRequests() {
    const configService = ConfigService.getInstance();

    ipcMain.handle(
        'config:get',
        async (event: IpcMainInvokeEvent, key: keyof AppConfig) => {
            return configService.get(key);
        },
    );
    
    ipcMain.handle(
        'config:set',
        async <Key extends Exclude<keyof AppConfig, 'locale'>>(
            event: IpcMainInvokeEvent,
            key: Key,
            value: AppConfig[Key],
        ) => {
            configService.set(key, value);
        },
    );
}