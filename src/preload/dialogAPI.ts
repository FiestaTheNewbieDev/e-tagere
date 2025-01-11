import { ipcRenderer } from "electron";

export type DialogAPI = {
    importBooks: typeof importBooks;
    importFolder: typeof importFolder;
}

const importBooks = async () => ipcRenderer.invoke('dialog:import-books');
const importFolder = async () => ipcRenderer.invoke('dialog:import-folder');

const dialogAPI: DialogAPI = {
    importBooks,
    importFolder,
}

export default dialogAPI;