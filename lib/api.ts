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
      const urlLimit = "\https://pokeapi.co/api/v2/pokemon/?limit=12";
      const response = await fetch(urlLimit);

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      const pokemonList = await response.json();

      //you need the URL to fetch the pokemon and get the data, use a map and see what happens

      return pokemonList;
    } catch (error) {
      console.error("API Call failed:", error);
    }
  }
}
