const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMFA2ak8wamFsaThNYjZqVzZyT2ZUcTY1cnlXSnVQOEVVNkltNWp1ZTlIND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWWFlOFloTHBWTGhGaXJrQlRFalBtUWg0YjNsbmxwbXJ1OURsVnNTRWNDND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIyUFhBNGczSWVOb3hZbWd4SU1ZeDBkd1FDZkdwSWo4WHl1U05RYjJnejJBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJWDVFZ3Y1b3JKWEh5L0tyWUZ2L0xQYnE1a2tnQnBRWHdFQ2NqV2lJclJnPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9QTGlmWnZuWTVYcnNOVnN4d0RadnZ5U2Fiak1kZWFiS0VZZGt5b2JoRzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRyVlNES0FLNTlJWWpQYUxZMEJBTEhuaEV2WG1TNU1SMVpxZjNFMng4SDg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0lxeEExRTJadmtLbHZuMklhMCs4R09ONzNYYk96QjNmbVltQUdWaXIwaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNFF2NmpYaXQ2RTJtTGowZWRJRjdzQ2YzY0UySlZnVXlGQ2c2eStzZE9CMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBHaVNhZGR3c0pDQWx3aXUyam5ieXluSlZ0SkdpRlU0VnBqd0pEU2hkRHNGbnJ6Tnd3Tkw3UGF1YUptZ080WDFmRjZlcVlOL2J6TjVIUitUZWN5R2lRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzAsImFkdlNlY3JldEtleSI6Iks1Y0o4Z245VnN2S21pOFZCNGVGZlNYelFvVTVjTWV3ZWpiSXR2UEgwM1k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMyLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Ikxxd2tyVVdmVFJpOFNwQ205b05ubkEiLCJwaG9uZUlkIjoiOGUyY2VhZGQtMmJkYS00N2I3LWFmNDAtMmQ4ZWQ0M2FjZTBlIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVpa0k0WlBWTmZxZmM0b3B5ckRmakhEZW1Kdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJIWEFlKysvNi9xaURNQjJoZ1JPTzJBM3NjcnM9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiSEtTS0pQV1AiLCJtZSI6eyJpZCI6IjI0Mzg0OTk2Mjg0ODo1M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTERnOHJRQkVKbXYycmtHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiRjZWMnJxdW9OUGs2d3JBK3RueDV5ZmtEdDd3dUFRYVhWMGp4eW1UOGxIQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiQi9teEgyZlJRejZ5akpSaHBsaTFWVnNrNDhnWnlrYVNVNFpJTEVCLzFFVG5Kc3piTXNHaTRhTSs1UkVoRjIzdW01dS9vc2hFQzNhUGsrN0FNVTBYQVE9PSIsImRldmljZVNpZ25hdHVyZSI6IndSanlscWF0Nk5sQkFWNWI4UUVuTU5adktoYmliRFNYTDRqcVBxVGlaSjlUcG1QNWdSenNYa0w0SUpoY09xTkd3RkwyTVN2SHdnNDhOcDVzSFBlUmp3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjQzODQ5OTYyODQ4OjUzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlJlbGRxNnJxRFQ1T3NLd1ByWjhlY241QTdlOExnRUdsMWRJOGNway9KUncifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzE2MzEwMTV9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "kang jinhuyk",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " kang jinhuyk",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'UNKNOWN-MD',
    URL : process.env.BOT_MENU_LINKS || 'https://i.imgur.com/xvYDAsD.jpeg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
