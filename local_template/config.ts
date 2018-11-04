class Config {
    
    mongoConnectionString: string = "mongodb+srv://USER:PASS@URL/test?retryWrites=true";
    
    mongoDatabaseName: string = "test";

    mongoCollectionName: string = "masterless-storage";

}

var config = new Config();

export {config};