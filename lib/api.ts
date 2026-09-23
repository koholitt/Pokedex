export async function getPokemon() {
  const apiUrl = process.env.POKEMON_API_URL;

  if (!apiUrl) throw new Error("Missing POKEMON_API_URL enviroment variable");

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
