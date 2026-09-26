export async function getPokemon(id: string) {
  const apiUrl = process.env.POKEMON_API_URL;
  const singleApiUrl = process.env.SINGLE_POKEMON_SEARCH_API_URL;

  if (!apiUrl) throw new Error("Missing POKEMON_API_URL enviroment variable");
  if (!singleApiUrl)
    throw new Error("Missing SINGLE_POKEMON_SEARCH_API_URL enviroment variable");

  if (id) {
    const response = await fetch(singleApiUrl + id);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    return data;
  } else {
    const response = await fetch(apiUrl);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();

    const filteredData = await Promise.all(
      data.results.map((pokemon: { name: string; url: string }) => {
        const getId = pokemon.url.split("/").filter(Boolean).pop(); //get the id from the url avoiding empty items

        if (getId == undefined) {
          throw new Error("Id is missing");
        }
        return {
          id: getId, //could be unfefined but pokeApi is very consistent so this might never be true
          name: pokemon.name,
          url: pokemon.url,
        };
      }),
    );

    return filteredData;
  }
}
