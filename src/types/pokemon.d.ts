declare interface PokemonListResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: NamedAPIResource[];
}

declare interface NamedAPIResource {
    name: string;
    url: string;
}

declare interface Pokemon {
    id: number;
    name: string;
    sprites: {
        other:{
            "official-artwork": {
                front_default: string;
            };
        };
    };
    types:{
        slot: number;
        type: NamedAPIResource;
    }[];
    heught: number;
    weight: number;
    stats: PokemonStat[];
}

declare interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: NamedAPIResource;
}