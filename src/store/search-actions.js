import { searchActions } from "./search-slice";

export const performSearch = (searchTerm, artistSearch, nextCall, nextCallArtist) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const artistSearchUrl = artistSearch && `https://api.harvardartmuseums.org/object?apikey=${process.env.REACT_APP_KEY}&size=12&sortorder=desc&sort=totalpageviews&fields=primaryimageurl,title,dated,century&person="${artistSearch}"`;

      const searchTermUrl = searchTerm && `https://api.harvardartmuseums.org/object?apikey=${process.env.REACT_APP_KEY}&size=10&classification=Paintings&sortorder=desc&sort=totalpageviews&fields=primaryimageurl,title,dated,people,century,medium,culture&q=title:${searchTerm}*`;

      const url = nextCall || nextCallArtist || artistSearchUrl || searchTermUrl;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Couldn't fetch data");
      }

      const data = await response.json();
      return data;
    };

    try {
      const searchData = await fetchData();

      const paintingsWithImage = searchData.records.filter((record) => record.primaryimageurl);
      const search = (searchTerm || nextCall) && paintingsWithImage;
      const artist = (artistSearch || nextCallArtist) && paintingsWithImage; //edit
      const next = (searchTerm || nextCall) && searchData.info.next;
      const prev = (searchTerm || nextCall) && searchData.info.prev;

      const nextArtist = (artistSearch || nextCallArtist) && searchData.info.next;
      const prevArtist = (artistSearch || nextCallArtist) && searchData.info.prev;
      dispatch(
        searchActions.loadSearchResults({
          search,
          artist,
          next,
          prev,
          nextArtist,
          prevArtist,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchPainting = (id) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const url = `https://api.harvardartmuseums.org/object/${id}?apikey=${process.env.REACT_APP_KEY}&fields=primaryimageurl,title,dated,people,century,medium,images`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Couldn't fetch data");
      }

      const data = await response.json();
      return data;
    };

    try {
      const painting = await fetchData();
      dispatch(searchActions.loadPainting({ painting }));
    } catch (error) {
      console.log(error);
    }
  };
};
