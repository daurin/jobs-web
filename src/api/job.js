import axios from 'axios';
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    }
});

export const getJobs = (config = {
    textSearch: '', offset: 0, limit: 30, status: 'S'
}) => {
    const { textSearch = '', offset = 0, limit = 30, status } = config;

    return api.get('/jobs', {
        params: {
            textSearch,
            offset,
            limit,
            status
        }
    })
        .then(res => {
            if (res.status === 200) { // Buscamos el usuario del empleo
                return Promise.all(res.data.data.map(v => {
                    if (v.user)
                        return api.get(v.user).
                            then((r => Promise.resolve({
                                ...v,
                                user: {
                                    id: r.data.id,
                                    name: r.data.name
                                }
                            })));
                    else return Promise.resolve(v);
                }));
            }
        })
        .then(res => { // Buscamos la categoria del empleo
            return Promise.all(res.map(v => {
                if (v.category)
                    return api.get(v.category).
                        then((r => Promise.resolve({
                            ...v,
                            category: {
                                id: r.data.id,
                                name: r.data.name
                            }
                        })));
                else return Promise.resolve(v);
            }));
        });
}