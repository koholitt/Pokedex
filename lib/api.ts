export async function getPokemon() {
  const url = "\https://pokeapi.co/api/v2/pokemon/?limit=12";

  try {
    const response = await fetch(url);

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error("API Call failed:", error);
  }
}
