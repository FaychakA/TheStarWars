export const getIdFromUrl = (url: string) => {
    const splitUrlArray = url.split('/');
    const id = splitUrlArray[splitUrlArray.length - 2];

    return id;
};

export const getUrlFromId = (id: string, category: string) => {
    const url = `http://swapi.dev/api/${category}/${id}/`;

    return url;
};
