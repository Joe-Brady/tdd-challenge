const filterMovies = require("./filterMovies");
// return a list of movies
// filter based on a query-esque object, if specified
// limit the number of movies returned, if specified
// function with three arguments - movies, filter, and pageSize
// should filter first, then apply pageSize, not the other way around

let result;

const movies = [
  {
    name: "The Spy Who Loved Me",
    year: 1977,
    writtenBy: "Ian Fleming"
  },
  {
    name: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    writtenBy: "J.R.R. Tolkien"
  },
  {
    name: "Goldeneye",
    year: 1995,
    writtenBy: "Ian Fleming"
  },
  {
    name: "Star Wars: Episode IV - A New Hope",
    year: 1977,
    writtenBy: "George Lucas"
  },
  {
    name: "Casino Royale",
    year: 2006,
    writtenBy: "Ian Fleming"
  }
];

describe("given no arguments", () => {
  beforeEach(() => {
    try {
      result = filterMovies();
    } catch (err) {
      result = err;
    }
  });

  it("throw the correct error", () => {
    expect(result.message).toBe("No arguments provided");
  });
});

describe("given only a movies argument", () => {
  beforeEach(() => {
    result = filterMovies(movies);
  });

  it("should return the full list of movies", () => {
    expect(result).toEqual(movies);
  });
});

describe("given no pageSize argument", () => {
  describe("given an empty filter object", () => {
    beforeEach(() => {
      const filter = {};
      result = filterMovies(movies, filter);
    });

    it("should return the full list of movies", () => {
      expect(result).toEqual(movies);
    });
  });

  describe("given a filter object with one key", () => {
    beforeEach(() => {
      const filter = { year: 1977 };
      result = filterMovies(movies, filter);
    });

    it("should return the movies, filtered based on the single key", () => {
      const expectedResult = [
        {
          name: "The Spy Who Loved Me",
          year: 1977,
          writtenBy: "Ian Fleming"
        },
        {
          name: "Star Wars: Episode IV - A New Hope",
          year: 1977,
          writtenBy: "George Lucas"
        }
      ];

      expect(result).toEqual(expectedResult);
    });
  });

  describe("given a filter object with multiple keys", () => {
    beforeEach(() => {
      const filter = { year: 1977, writtenBy: "Ian Fleming" };
      result = filterMovies(movies, filter);
    });

    it("should return the movies, filtered based on the multiple keys", () => {
      const expectedResult = [
        {
          name: "The Spy Who Loved Me",
          year: 1977,
          writtenBy: "Ian Fleming"
        }
      ];

      expect(result).toEqual(expectedResult);
    });
  });
});

describe("given a pageSize argument that is less than the number that the filter returns", () => {
  beforeEach(() => {
    const filter = { writtenBy: "Ian Fleming" };
    const pageSize = 2;
    result = filterMovies(movies, filter, pageSize);
  });

  it("should return the first 'pageSize' number of movies AFTER the filter has been applied", () => {
    const expectedResult = [
      {
        name: "The Spy Who Loved Me",
        year: 1977,
        writtenBy: "Ian Fleming"
      },
      {
        name: "Goldeneye",
        year: 1995,
        writtenBy: "Ian Fleming"
      }
    ];

    expect(result).toEqual(expectedResult);
  });
});

describe("given a pageSize argument that is more than the number that the filter returns", () => {
  beforeEach(() => {
    const filter = { year: 1977 };
    const pageSize = 4;
    result = filterMovies(movies, filter, pageSize);
  });

  it("should return the full list of movies AFTER the filter has been applied", () => {
    const expectedResult = [
      {
        name: "The Spy Who Loved Me",
        year: 1977,
        writtenBy: "Ian Fleming"
      },
      {
        name: "Star Wars: Episode IV - A New Hope",
        year: 1977,
        writtenBy: "George Lucas"
      }
    ];

    expect(result).toEqual(expectedResult);
  });
});
