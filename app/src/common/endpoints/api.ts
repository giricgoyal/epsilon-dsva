export const API_BASE = '/api'

export const getData = async (path: string) => {
    try {
        const url = `${API_BASE}/${path}`
        const resp = await fetch(url)
        const json = await resp.json()
        return json
    } catch(error) {
        console.log(error)
    }
}