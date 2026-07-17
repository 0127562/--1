/*
===========================================================
KNK ARCHIVE CONSOLE
app.js
Core Application
Version 1.0
===========================================================
*/

"use strict";

/* =======================================================
   GLOBAL OBJECT
======================================================= */

const KNK = {

    version: "1.0",

    build: "Alpha",

    ready: false,

    bootFinished: false,

    currentDirectory: "/",

    currentUser: "Administrator",

    startTime: null,

    loadedModules: [],

    databases: {},

    settings: {},

    cache: {},

    commands: {},

    history: [],

    filesystem: {},

    searchIndex: [],

    debug: true

};

/* =======================================================
   DOM
======================================================= */

const DOM = {

    bootScreen: document.getElementById("bootScreen"),

    bootOutput: document.getElementById("bootOutput"),

    bootBar: document.getElementById("bootProgressBar"),

    application: document.getElementById("application"),

    terminalOutput: document.getElementById("terminalOutput"),

    terminalInput: document.getElementById("terminalInput"),

    cursor: document.getElementById("cursor"),

    windowStatus: document.getElementById("windowStatus"),

    notificationLayer: document.getElementById("notificationLayer"),

    modalLayer: document.getElementById("modalLayer")

};

/* =======================================================
   MODULES
======================================================= */

const MODULES = [

    "Utils",

    "History",

    "Autocomplete",

    "Filesystem",

    "Search",

    "Parser",

    "Loader",

    "Renderer",

    "Commands",

    "Terminal"

];

/* =======================================================
   INITIALIZATION
======================================================= */

window.addEventListener("load", initializeApplication);

async function initializeApplication(){

    KNK.startTime = Date.now();

    console.clear();

    console.log("KNK Archive Console");
    console.log("------------------------------");

    hideApplication();

    await bootSequence();

    showApplication();

    initializeModules();

    printWelcomeMessage();

    KNK.ready = true;

    console.log("System Ready.");

}

/* =======================================================
   BOOT
======================================================= */

async function bootSequence(){

    for(const module of MODULES){

        await bootModule(module);

    }

    KNK.bootFinished = true;

}

async function bootModule(name){

    appendBootLine(name);

    updateProgress();

    await delay(120);

    KNK.loadedModules.push(name);

}

/* =======================================================
   BOOT OUTPUT
======================================================= */

function appendBootLine(module){

    const line = document.createElement("div");

    line.className = "bootLine";

    line.innerHTML = `

        <span class="bootModule">

            Loading ${module}

        </span>

        <span class="bootStatus">

            OK

        </span>

    `;

    DOM.bootOutput.appendChild(line);

    DOM.bootOutput.scrollTop = DOM.bootOutput.scrollHeight;

}

/* =======================================================
   PROGRESS BAR
======================================================= */

function updateProgress(){

    const percent =
        (KNK.loadedModules.length / MODULES.length) * 100;

    DOM.bootBar.style.width = percent + "%";

}

/* =======================================================
   SHOW / HIDE
======================================================= */

function hideApplication(){

    DOM.application.style.display = "none";

}

function showApplication(){

    DOM.bootScreen.style.display = "none";

    DOM.application.style.display = "flex";

}

/* =======================================================
   MODULE INIT
======================================================= */

function initializeModules(){

    if(typeof initializeTerminal==="function"){

        initializeTerminal();

    }

    if(typeof initializeHistory==="function"){

        initializeHistory();

    }

    if(typeof initializeAutocomplete==="function"){

        initializeAutocomplete();

    }

    if(typeof initializeFilesystem==="function"){

        initializeFilesystem();

    }

    if(typeof initializeSearch==="function"){

        initializeSearch();

    }

    if(typeof initializeCommands==="function"){

        initializeCommands();

    }

}

/* =======================================================
   WELCOME
======================================================= */

function printWelcomeMessage(){

    if(typeof terminalPrint!=="function"){

        return;

    }

    terminalPrint("");

    terminalPrint("=======================================");

    terminalPrint("KNK ARCHIVE CONSOLE");

    terminalPrint("Universe Management System");

    terminalPrint("");

    terminalPrint("Version : " + KNK.version);

    terminalPrint("Build   : " + KNK.build);

    terminalPrint("");

    terminalPrint("Type 'help' to see available commands.");

    terminalPrint("");

}

/* =======================================================
   DELAY
======================================================= */

function delay(ms){

    return new Promise(resolve=>{

        setTimeout(resolve,ms);

    });

}

/* =======================================================
   DEBUG
======================================================= */

function debug(...message){

    if(!KNK.debug){

        return;

    }

    console.log("[KNK]",...message);

}

/* =======================================================
   SYSTEM INFO
======================================================= */

function getSystemUptime(){

    return Date.now()-KNK.startTime;

}

function getLoadedModuleCount(){

    return KNK.loadedModules.length;

}

function getVersion(){

    return KNK.version;

}

function getBuild(){

    return KNK.build;

}

/* =======================================================
   END
======================================================= */

debug("app.js loaded.");
