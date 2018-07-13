//Discord RPC
const DiscordRPC = require('discord-rpc');
const ClientId = "441220020278919169";
DiscordRPC.register(ClientId);
const rpc = new DiscordRPC.Client({
  transport: 'ipc'
});
const startTimestamp = new Date();
rpc.login(ClientId).catch(console.error);

//Main
const {app, BrowserWindow} = require('electron');
let win;

function createWindow() {
  rpc.on('ready', () => {
    rpc.setActivity({
      state: 'MizoreApp on Desktop',
      startTimestamp,
      largeImageKey: 'big-mizore',
      largeImageText: 'MizoreApp',
      smallImageKey: 'small-elect',
      smallImageText: 'Built using Electron',
      instance: false,
    });
  });

  win = new BrowserWindow({
    width: 900,
    height: 700,
    title: 'MizoreApp'
  });

  win.loadFile('src/index.html');
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('browser-window-created', function(e, window) {
  window.setMenu(null);
});