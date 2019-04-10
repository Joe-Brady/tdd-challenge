const filterMovies = (movies, filter, pageSize) => {
  if (movies) {
    const filterLogic = movie => {
      let matchesQuery = true;

      for (let key in filter) {
        if (movie[key] !== filter[key]) {
          matchesQuery = false;
        }
      }

      return matchesQuery;
    };

    const filteredMovies = movies.filter(filterLogic);

    const pageOfMovies = filteredMovies.slice(0, pageSize);

    return pageOfMovies;
  } else {
    throw new Error("No arguments provided");
  }
};

module.exports = filterMovies;
