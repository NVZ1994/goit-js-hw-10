import { Notify } from 'notiflix/build/notiflix-notify-aio'
export default function fetchCountries(url, country) {
    return fetch(`${url}/${country}?fields=name,capital,population,flag,languages`)
        .then(r => r.json())
        .then(data => {
            if (data.status !== 404) {
                return data;
            }
            else { return Notify.failure("Oops, there is no country with that name") }

        }).catch(e => {
            return Notify.failure("Oops, there is no country with that name")
        })
};