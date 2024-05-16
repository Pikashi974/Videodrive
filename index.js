const { app, BrowserWindow } = require("electron");
const expressRoad = require("./express");

expressRoad;

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: "renderer.js",
    },
  });

  // to prevent the Sync Connection from ending prematurely, start reading from stdin so we don't exit
  process.stdin.resume();

  win.loadURL("http://localhost:8000/index");
}

app.whenReady(); //.then(createWindow);
