import graphRepository, { Entry } from './GraphRepository'

export default async (name: string): Promise<Entry> => {
    let entry = await graphRepository.findByName(name)

    if (entry) {
        throw new Error("Already Exists")
        // here also it should be some other type of error
        // For example DuplicationError
        // So Controller can return 409 - https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.10
    }

    const entryToSave = {
        text: "",
        img: "",
        name,
        outputUpdated: false
    }
    graphRepository.save(entryToSave)

    return entryToSave;
}
