
const BASE_URL = 'http://127.0.0.1:8000/'
export const TOKEN = localStorage.getItem('token')

export const getFetch = (url, signal) => {
    fetch(url, {
        signal : signal ? signal : '',
        headers : {
          'Content-Type': 'application/json',
          'Authorization' : 'Token f5d37c9927aac5f64a38a3f59a1934cb1dc2e90f'
        }
    })
}

export const postFetch = (url, body) => {
    fetch(url, {
        method : 'POST',
        headers : {
          'Content-Type': 'application/json',
          'Authorization' : 'Token f5d37c9927aac5f64a38a3f59a1934cb1dc2e90f'
        },
        body: JSON.stringify(body)
    })
}


export default BASE_URL;