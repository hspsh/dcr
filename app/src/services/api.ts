import config from '../config'

interface fetchTextObject {
  name: string,
  text: string,
  outputUpdated: boolean,
  newEntry: boolean,
}

interface fetchImgObject {
  content: string,
  updated: boolean,
  exists: boolean
}

export default class api {
  id: string = ''
  async fetchText(): Promise<string> {
    const response: fetchTextObject = await fetch(`${config.api.protocol}://${config.api.host}:${config.api.port}/p/${this.id}`)
      .then(res => res.json() || { name: '', text: '', outputUpdated: false, newEntry: false })
    return response.text
  }
  async postText(text: string): Promise<void> {
    await fetch(`${config.api.protocol}://${config.api.host}:${config.api.port}/p/${this.id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: text
      })
    }).then(res => console.info(res))
  }
  async fetchImg(): Promise<fetchImgObject> {
    return await fetch(`${config.api.protocol}://${config.api.host}:${config.api.port}/i/${this.id}`)
      .then(res => res.json() || { content: "", updated: false, exists: true })
  }
  constructor(id: string | undefined) {
    if (id) {
      this.id = id
    }
  }
}