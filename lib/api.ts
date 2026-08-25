export async function getPokemon() {
  const apiUrl = process.env.POKEMON_API_URL;

  if (!apiUrl) throw new Error("Missing POKEMON_API_URL enviorment variable");

  const response = await fetch(apiUrl);

  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

  const data = await response.json();

  const filteredData = await Promise.all(
    data.results.map((pokemon: { name: string; url: string }) => {
      const getID = pokemon.url.split("/").filter(Boolean).pop();

      return {
        id: getID,
        name: pokemon.name,
        url: pokemon.url,
      };
    }),
  );
  console.log(filteredData);

  return filteredData;
}
