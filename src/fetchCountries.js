export function fetchCountries(name) {
    const BASE_URL = `https://restcountries.com/v3.1/name/${name}`

return fetch(`${BASE_URL}?fields=name,flags,capital,population,languages`)
.then(resp => {
    if(!resp.ok){
        throw new Error(resp.statusText)
    }
    return resp.json()
})
}

