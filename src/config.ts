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
    return priv.conf;
}

export {
    Config,
    setConfig,
    getConfig
}