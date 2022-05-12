export type Results = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image : string,
    origin: Origin,
    location: Location,
    episode: string,
    url: string,
    created: string,
};
export type Origin = {
    name: string,
    url: string,
};
export type Location = {
    name: string,
    url: string,
    id: number,
    type: string,
    dimension: string,
};

export type Episodes = {
    id: number,
    name : string,
    // eslint-disable-next-line camelcase
    air_date: string,
    episode: string,
    characters: Characters,
    url: string;
    created: string,
}
export type Characters = {
    id: number,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    image : string,

}
