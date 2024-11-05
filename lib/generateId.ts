import { v4 as uuidv4 } from '../node_modules/uuid/dist/esm-browser/index.js'

export default function generateId (): string {
    let id: string = uuidv4();

    return id;
}

