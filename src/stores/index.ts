import { createStore } from "vuex";

export interface IPokemon {
  name: string;
  url: string;
}

export interface IStoreState {
  pokemons: IPokemon[];
  selectedPokemons: IPokemon[];
  isLoading: boolean;
  isError: boolean;
}

export const store = createStore<IStoreState>({
  state: {
    pokemons: [],
    selectedPokemons: [],
    isLoading: false,
    isError: false,
  },
  getters: {
    allPokemons: (state: IStoreState) => state.pokemons,
    selectedPokemons: (state: IStoreState) => state.pokemons,
  },
  mutations: {
    setPokemons: (state: IStoreState, payload: IPokemon[]) => {
      state.pokemons = payload;
    },
    setLoading: (state: IStoreState, payload: boolean) => {
      state.isLoading = payload;
    },
    setError: (state: IStoreState, payload: boolean) => {
      state.isError = payload;
    },
    toggleSelectedPokemon: (state: IStoreState, payload: IPokemon) => {
      if (state.pokemons.includes(payload)) {
        state.selectedPokemons.filter(
          (pokemon) => pokemon.name !== payload.name
        );
        return;
      }
      state.selectedPokemons.push(payload);
    },
  },
  actions: {
    loadPokemons: async ({ commit }) => {
      commit("setLoading", true);
      commit("setError", false);
      try {
        const fetchPokemon = await fetch(`http://localhost:3001/pokemons`);
        if (!fetchPokemon.ok) {
          throw new Error(`Error: loadPokemons`);
        }

        commit("setPokemons", await fetchPokemon.json());
      } catch (e) {
        commit("setError", true);
      } finally {
        commit("setLoading", false);
      }
    },
  },
});
