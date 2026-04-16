# FCC Data Visualization — Treemap Diagram

D3 treemap visualization of hierarchical data, built for the FreeCodeCamp Data Visualization certification.

## Features

- SVG treemap showing the top 100 highest-grossing movies grouped by genre
- Tile sized proportionally to value; long labels wrapped across lines using a capital-letter split heuristic
- Ordinal color scale (`schemeSet1`) assigns a distinct color per genre category
- Hover tooltip displaying movie name, genre category, and revenue value
- Color legend bar rendered below the treemap with genre labels

## Tech Stack

- Vanilla JavaScript
- [D3.js](https://d3js.org/)
- Parcel (bundler)
- HTML / CSS

## Requirements

- Node.js 16+ (Parcel requires it)
- npm 8+

## Installation

```bash
npm install
```

## Usage

```bash
npm run dev
```

Open `http://localhost:1234` in a browser. The default Parcel port is `1234`.

## Data Source

- `https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json`

## Project Structure

```
.
├── css/
├── js/
├── index.html
└── package.json
```

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file.
