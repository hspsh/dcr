import graphRepository from './GraphRepository'

// we don't care here if there is any request, we want just to update or create a content in some entry
export default async (name: string, content: string) => {
    let entry = await graphRepository.findByName(name)

    if (!entry) {
        // Use exceptions for unhappy path. It will reject promise if used in async.
        throw new Error("can't update non existent entry") 
        // Here it would be nice to have something like new ArgumentError so Controller knows that it is 400 error not 500
    }

    console.log(content)
    entry.text = content
    entry.outputUpdated = false

    return graphRepository.update(entry)
        .catch(()=>Promise.reject(new Error("Failed to update"))) // it is almost the same as throwing the error
    // Here it should be something like DatabaseError, so Controller knows that it should be 500 error
}
