import { paintingActions } from "./painting-slice";

export const fetchPaintingData = (page) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const url = `https://api.harvardartmuseums.org/object?apikey=${process.env.REACT_APP_KEY}&hasimage=1&size=10&classification=Paintings&sortorder=desc&sort=totalpageviews&fields=division,primaryimageurl,colors,title,images,dated,people,url,century,labeltext,medium,culture&page=${page}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Couldn't not fetch data");
      }

      const data = await response.json();
      return data;
    };

    try {
      const paintingsData = await fetchData();

      const paintingsWithImageAndDescription = paintingsData.records.filter((record) => record.images.length && record.labeltext);

      dispatch(paintingActions.loadPaintings({ paintings: paintingsWithImageAndDescription }));
    } catch (err) {
      console.log(err);
    }
  };
};
