export async function getPokemon(pokemon: string) {
  if (typeof pokemon != "undefined" && pokemon) {
    try {
      const urlName = `\https://pokeapi.co/api/v2/pokemon/${pokemon}`;
      const response = await fetch(urlName);

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      return await response.json();
    } catch (error) {
      console.error("API Call failed:", error);
    }
  } else {
    try {
      const urlLimit = "https://pokeapi.co/api/v2/pokemon/?limit=12";
      const response = await fetch(urlLimit);

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();

      const pokemonList = await Promise.all(
        data.results.map(async (pokemon: { id: string; url: string }) => {
          const response = await fetch(pokemon.url);

          if (!response.ok)
            throw new Error(`HTTP error! Status: ${response.status}`);

          const data = await response.json();

          return {
            id: data.id,
            name: data.name,
          };
        }),
      );

      return pokemonList;
    } catch (error) {
      console.error("API Call failed:", error);
    }
  }
}
