export async function getPokemon() {
  // fetches the full list used by the grid + search
  const apiUrl = process.env.POKEMON_API_URL;
  if (!apiUrl) throw new Error("Missing POKEMON_API_URL environment variable");

  const response = await fetch(apiUrl + "?limit=1025");
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();

  return Promise.all(
    data.results.map((pokemon: { name: string; url: string }) => {
      const id = pokemon.url.split("/").filter(Boolean).pop();
      if (!id) throw new Error("Id is missing");
      return { id, name: pokemon.name, url: pokemon.url };
    }),
  );
}

export async function getPokemonById(id: string) {
  // one pokemon's core data: name, sprite id, types array, and ability REFERENCES (name+url only - no effect text yet)
  const singleApiUrl = process.env.SINGLE_POKEMON_SEARCH_API_URL;
  if (!singleApiUrl)
    throw new Error("Missing SINGLE_POKEMON_SEARCH_API_URL environment variable");

  const response = await fetch(singleApiUrl + id);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return response.json();
}

export async function getPokemonDescription(speciesUrl: string) {
  // species endpoint holds the flavor-text description, in many languages - filter to English
  const response = await fetch(speciesUrl);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  const data = await response.json();

  const englishEntry = data.flavor_text_entries.find(
    (entry: { language: { name: string } }) => entry.language.name === "en",
  );

  return englishEntry
    ? englishEntry.flavor_text.replace(/\f/g, " ")
    : "No description available.";
}

export async function getPokemonAbilities(
  abilities: { ability: { name: string; url: string } }[],
) {
  // each ability only has a name+url on the pokemon object - fetch each one individually for its effect text
  return Promise.all(
    abilities.map(async (entry) => {
      const response = await fetch(entry.ability.url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();

      const englishEffect = data.effect_entries.find(
        (e: { language: { name: string } }) => e.language.name === "en",
      );

      return {
        name: entry.ability.name,
        effect: englishEffect
          ? englishEffect.short_effect
          : "No effect description available.",
      };
    }),
  );
}
