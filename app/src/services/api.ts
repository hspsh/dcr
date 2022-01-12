import config from '../config'

interface fetchTextObject {
  name: string,
  input: string,
  output: string,
  outputUpdated: boolean,
  newEntry: boolean,
}

interface fetchImgObject {
  file: string,
  exists: boolean,
}

export default class api {
  id: string = ''
  async fetchText(): Promise<string> {
    const response: fetchTextObject = await fetch(`http://${config.api.host}:${config.api.port}/p/${this.id}`)
      .then(res => res.json() || { name: '', input: '', output: '', outputUpdated: false, newEntry: false })
    return await fetch((new URL(`${response.input}.gz`, `http://${config.api.host}:${config.api.port}`)).href).then(res => res.text())
  }
  async postText(text: string): Promise<void> {
    await fetch(`http://${config.api.host}:${config.api.port}/p/${this.id}`, {
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
    return await fetch(`http://${config.api.host}:${config.api.port}/i/${this.id}`)
      .then(res => ({ file: "", exists: true }))
  }
  constructor(id: string | undefined) {
    if (id) {
      this.id = id
    }
  }
}