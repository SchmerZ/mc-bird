import path from 'path';
import nconf from 'nconf';

class AppConfig {
    constructor(configFolder) {
        nconf
            .env()
            .argv()
            .defaults({'mcBird:Environment': 'production', 'PORT': 8090})
            .file(`${nconf.get().mcBird.Environment}-config-file`, {
                file: `${path.join(configFolder, nconf.get().mcBird.Environment)}.configuration.json`
            });
    }

    get(key) {
        if (key) {
            return nconf.get(key);
        }

        return nconf.get();
    }
}

let instance;

export default (configFolder) => {
    if (!instance) {
        instance = new AppConfig(configFolder);
    }

    return instance;
}