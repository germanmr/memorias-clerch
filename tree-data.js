/** Datos del arbol genealogico Clerch (1615–1957) segun el manuscrito de Esteban Clerch. */
window.GENEALOGY_TREE = {
  ancestors: [
    { name: "Antonio Clerch", born: 1615, place: "Das", spouse: "Catalina Vigo" },
    { name: "Juan Clerch y Vigo", born: 1657 },
    { name: "Miguel Clerch", born: 1677, spouse: "María Rusiñol" },
    { name: "Miguel Clerch y Rusiñol", born: 1726, spouse: "Donata Platero" },
    { name: "José Clerch y Platero", born: 1750, spouse: "Rosa Rusiñol" },
    { name: "Lorenzo Clerch y Rusiñol", born: 1773, spouse: "María Pujol" },
    { name: "José Clerch y Pujol", born: 1797, died: 1853, spouse: "Rosa Capdevila" },
    { name: "José Clerch y Capdevila", born: 1821, died: 1893, spouse: "María Juandó" },
    {
      name: "Salvador Clerch y Juandó",
      born: 1854,
      died: 1922,
      spouse: { name: "Buenaventura Casals y Forcada", born: 1855, died: 1942 },
      highlight: true
    }
  ],
  siblings: [
    { name: "Rosa Clerch", born: "28 ago 1880", died: 1895, note: "tifus" },
    { name: "Francisco Clerch", born: "19 feb 1882", died: 1895, note: "tifus" },
    { name: "Esteban Clerch Casals", born: "8 feb 1884", highlight: true, author: true },
    { name: "Pedro Clerch", born: "11 jun 1886", died: 1906, note: "tifus" },
    { name: "Dolores Clerch", born: "10 may 1888", died: 1895, note: "tifus" },
    { name: "Francisca Clerch", born: "13 may 1890", died: 1895, note: "tifus" },
    { name: "Marcos Clerch", born: "9 ago 1892", died: 1933, note: "operación" },
    { name: "María Clerch Casals", born: "25 ago 1894" }
  ],
  esteban: {
    name: "Esteban Clerch Casals",
    born: 1884,
    spouse: { name: "Dolores Bidart", wed: "9 dic 1909", place: "Santesteban, Navarra" },
    children: [
      {
        name: "Francisco Clerch Bidart (Tito)",
        born: "18 ene 1911",
        spouse: { name: "Josefa Costa", wed: "7 jul 1939" },
        children: [
          { name: "Jorge", born: "3 abr 1940" },
          { name: "Hugo", born: "14 dic 1941" },
          { name: "Marta", born: "5 jul 1945" }
        ]
      },
      {
        name: "Salvador Clerch Bidart",
        born: "21 abr 1913",
        spouse: { name: "Dora Tejeda", wed: "4 dic 1940" },
        children: [
          { name: "Roberto", born: "18 sep 1941" },
          { name: "Dorita", born: "27 mar 1944" },
          { name: "Salvador", born: "3 dic 1946" },
          { name: "Enrique", born: "4 ene 1949" }
        ]
      },
      {
        name: "María Clerch Bidart",
        born: "3 may 1915",
        spouse: { name: "Miguel Romano", wed: "25 ene 1947", place: "Rosario" },
        children: [
          { name: "Noemí", born: "1 nov 1947" },
          {
            name: "Ana María",
            born: "21 jun 1951",
            children: [
              {
                name: "Germán Muñoz Romano",
                born: "31 ene 1982",
                place: "Argentina",
                spouse: { name: "Evangelina Colella" }
              }
            ]
          },
          { name: "Normita", born: "11 abr 1955" }
        ]
      },
      {
        name: "Rosita Clerch Bidart",
        born: "17 ago 1920",
        note: "soltera 1957"
      }
    ]
  },
  marcosBranch: {
    name: "Marcos Clerch",
    born: 1892,
    died: 1933,
    spouse: { name: "Isabel González", wed: 1927 },
    children: [
      { name: "Francisco Ramón Clerch González", born: "10 mar 1931", note: "Arquitectura, Bs. As." },
      {
        name: "Buenaventura Isabel Clerch González",
        born: "30 dic 1933",
        spouse: { name: "Nicolás Sabatini" },
        children: [{ name: "Marina Sabatini Clerch", born: "18 abr 1957" }]
      }
    ]
  }
};
