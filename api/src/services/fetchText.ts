import graphRepository, { Entry } from './GraphRepository'

export default async (name: string): Promise<Entry> => {
    let entry = await graphRepository.findByName(name)

    if (!entry) {
        console.log("Already Exists")

        const entryToSave = {
            text: "",
            img: "",
            name,
            outputUpdated: false
        }
        graphRepository.save(entryToSave)


        entry = await graphRepository.findByName(name)
    }

    return entry;
}
