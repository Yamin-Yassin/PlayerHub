import {CapacitorConfig } from '@capacitor/cli'

const config:CapacitorConfig = {
    appId: "io.ionic.starter",
    appName: "PlayerHub",
    webDir: "www",
    plugins: {
        SpalshScreen:{
            launchShowDuration:0,
        }
    }
};

export default config;