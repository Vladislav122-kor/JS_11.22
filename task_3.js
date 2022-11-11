class RickAndMorty {
  async getCharacter(id) {
    if (typeof id !== 'number' || Number.isNaN(id) || !Number.isFinite(id)) {
      throw new Error('The parameter is an invalid number');
    }
    const LINK = `https://rickandmortyapi.com/api/character/${id}`;
    
    return fetch(LINK)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((data) => data)
      .catch(() => null);
  }

  async getEpisode(id) {
    if (typeof id !== 'number' || Number.isNaN(id) || !Number.isFinite(id)) {
      throw new Error('The parameter is an invalid number');
    }
    const LINK = `https://rickandmortyapi.com/api/episode/${id}`;
    try {
      const RES = await fetch(LINK);
      if (!RES.ok) {
        throw new Error();
      }
      const DATA = await RES.json();
      return DATA;
    } catch {
      return null;
    }
  }
}