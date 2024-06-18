import { v4 as uuidv4 } from '../node_modules/uuid/dist/esm-browser/index.js'

export default function generateId () {
    let id = uuidv4();

    return id;
}

