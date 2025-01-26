# Cities and Countries Web Application

## Overview
This web application allows users to explore countries and cities. Users can click on a country to see a list of cities within it, view detailed information about a city, and mark cities they have visited. The visited cities are saved in the browser's local storage and can be viewed and cleared by the user.

### Key Features:
- **Countries List:** Displays a list of countries fetched from a `land.json` file.
- **Cities by Country:** When a country is clicked, a list of cities within that country is shown, fetched from a `stad.json` file.
- **City Details:** Clicking a city shows detailed information such as population and an option to mark it as "visited".
- **Visited Cities:** Users can see the cities they have marked as visited. The visited cities are stored in the browser's local storage and can be cleared.
- **Search Functionality:** A search bar allows users to search for countries and cities by name.
- **Error Handling:** Messages are shown when a city is already marked as visited or when there is an issue with adding/removing cities from the visited list.

## Files:
- **index.html:** The main HTML file that holds the structure of the page.
- **styles.css:** The CSS file for styling the application.
- **script.js:** The JavaScript file that contains the logic for fetching data, handling events, and managing local storage.
- **land.json:** A JSON file containing a list of countries.
- **stad.json:** A JSON file containing a list of cities and their respective countries.

## Installation

1. Clone this repository:
```
git clone <repository-url>
```
2. Open the `index.html` file in your web browser.

3. The app will load the data from `land.json` and `stad.json` files, so make sure these files are present in the project directory.

## Usage

- Click on any country name to see a list of cities within that country.
- Click on a city to see its details, including population.
- Mark a city as visited by clicking the "BESÖKT" button. The city will be saved to local storage and appear in the "Visited Cities" section.
- Use the "Clear History" button to clear the visited cities from local storage.

## Development

To modify or extend the functionality of the app, you can:

- Edit the `land.json` and `stad.json` files to add or remove countries and cities.
- Modify the `script.js` file to change how cities are displayed, how data is fetched, or how local storage is handled.
- Update the `styles.css` file to change the look and feel of the application.

## Technologies Used
- HTML
- CSS
- JavaScript (ES6+)
- JSON
