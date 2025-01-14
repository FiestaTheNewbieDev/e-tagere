import { ipcRenderer } from "electron";

export type DialogAPI = {
    importBooks: typeof importBooks;
    importFolder: typeof importFolder;
    openInFinder: typeof openInFinder;
}

const importBooks = async (): Promise<void> => ipcRenderer.invoke('dialog:import-books');
const importFolder = async (): Promise<void> => ipcRenderer.invoke('dialog:import-folder');
const openInFinder = async (path: string): Promise<void> => ipcRenderer.invoke('dialog:open-in-finder', path);

const dialogAPI: DialogAPI = {
    importBooks,
    importFolder,
    openInFinder,
}

export default dialogAPI;