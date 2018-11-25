interface Config {
    mongoConnectionString: string;
    mongoDatabaseName: string;
}

var priv: any = {};
priv.conf = null;

var setConfig = function(config: Config): void {
    priv.conf = config;
}

var getConfig = function(): Config {
    if (priv.conf == null) {
        throw new Error("You have not set a configuration. Please use config.setConfig");
    }
    return priv.conf;
}

export {
    Config,
    setConfig,
    getConfig
}