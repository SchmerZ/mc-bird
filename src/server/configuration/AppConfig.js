import fs from 'fs'
import path from 'path';
import nconf from 'nconf';

class AppConfig {
  constructor(configFolder) {
    nconf
      .env()
      .argv()
      .defaults({'mcBird:Environment': 'production', 'PORT': 8090});

    const configurationFilePath = `${path.join(configFolder, nconf.get().mcBird.Environment)}.configuration.json`;
    if (!fs.existsSync(configurationFilePath)) {
      console.log(`Unable to find configuration file: '${configurationFilePath}'.`)
    }

    nconf
      .file(`${nconf.get().mcBird.Environment}-config-file`, {
        file: configurationFilePath,
      })
      .required(['siteRoot']);
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
