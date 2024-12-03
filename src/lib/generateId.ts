import { v4 as uuidv4 } from 'uuid'

export default function generateId (): string {
    let id: string = uuidv4();

    return id;
}

