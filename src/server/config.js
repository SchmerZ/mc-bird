import path from 'path';
import appConfiguration from './configuration/AppConfig';

const config = appConfiguration(path.resolve(__dirname, 'configuration'));

export default {
    ...config.get().mcBird,
    port: config.get('PORT')
}