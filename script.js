//Fetching and handling of countries
fetch("land.json")
    .then(res => res.json())
    .then(data => {
        let countryList = document.getElementById("countryList");

        data.forEach(countries => {
            let countryListItem = document.createElement("li");
            countryListItem.textContent = countries.countryname;
            countryListItem.addEventListener("click", () => showCities(countries.id));
            countryList.appendChild(countryListItem);
        });
    });

//Fetching and handling of cities
function showCities(countriesId) {

    document.getElementById("cityHeader").style.display = "block";
    document.getElementById("cityList").style.display = "block";

    fetch("stad.json")
        .then(res => res.json())
        .then(data => {
            let cityList = document.getElementById("cityList")
            cityList.innerHTML = "";
        
            //Filterfunction = picking out cities depending on chosen country.
            data.filter(city => city.countryid === countriesId) //=== Check to see if its both the same value and type.
              .forEach(city => {
                let cityListItem = document.createElement("li");
                cityListItem.textContent = city.stadname + " - Population " + city.population;
                cityListItem.addEventListener("click", () => showCityDetail(city));
                cityList.appendChild(cityListItem);
                });
     });
}

//Function for details about clicked city.
function showCityDetail(city) {
    let cityDetail = document.getElementById("cityDetail");
    cityDetail.innerHTML =
    "<h3>" + city.stadname + "</h3>" + 
    "<p>Population: " + city.population + "</p>" +
    "<button id='visitedButton'>BESÖKT</button>";

    document.getElementById('visitedButton').addEventListener("click", () => (markCity(city.id)));
}

//Function to save visited city to localstorage
function markCity(cityId) {
    let visitedCities = JSON.parse(localStorage.getItem("visitedCities")) || [];
    let visitBtnMsgError = document.getElementById("visitBtnMsgError");

    if (!visitedCities.includes(cityId)) {
        visitedCities.push(cityId);
        localStorage.setItem("visitedCities", JSON.stringify(visitedCities));

        if (visitBtnMsgError) {
            visitBtnMsgError.style.display = "none";
        }
        
        //Textalert showing if added. Added fade effect to remove message
        let visitBtnMsg = document.getElementById("visitBtnMsg");
        if (visitBtnMsg) {
            visitBtnMsg.style.display = "block";
            visitBtnMsg.textContent = "Staden är sparad som besökt!";

            visitBtnMsg.style.opacity = 1;
            setTimeout(function() {
                visitBtnMsg.style.transition = "opacity 1s ease-out";
                visitBtnMsg.style.opacity = 0;
            }, 3000);
    }
             showVisitedCities();

             //Textalert showing if already added. Same fade effect.
    } else {
        if (visitBtnMsgError) {
            visitBtnMsgError.textContent = "Staden är redan sparad som besökt"
            visitBtnMsgError.style.display = "block";

            visitBtnMsgError.style.opacity = 1;
            setTimeout(function() {
                visitBtnMsgError.style.transition = "opacity 1s ease-out";
                visitBtnMsgError.style.opacity = 0;
            }, 3000);
        }
    }
}

//Function to load in localstorage, show and clear them.  

function showVisitedCities(){
    let visitedCities = JSON.parse(localStorage.getItem("visitedCities")) || []; //Grabbing keys from local storage --> Converting to json array. || [] to create a empty array at start
    let visitedCitiesList = document.getElementById("visitedCitiesList");
    visitedCitiesList.innerHTML = "";

    if (visitedCities.length === 0) {
        visitedCitiesList.innerHTML = "<li> Inga besökta städer finns sparade </li>";
    } else {
        let totalPop = 0; 

        fetch("stad.json")
            .then(res => res.json())
            .then(data => {
                visitedCities.forEach(cityId => {
                    let city = data.find(city => city.id === cityId);

                    if (city) {
                        totalPop += city.population;
                        let visitedListItem = document.createElement("li");
                        visitedListItem.textContent = city.stadname + " Population: " + city.population;
                        visitedCitiesList.appendChild(visitedListItem);
                    }
                });

            let totalPopItem = document.createElement("li");
            totalPopItem.innerHTML = "<b>Totala invånarantalet: </b>" + totalPop;
            visitedCitiesList.appendChild(totalPopItem);
        }); 
    }}

    //Added functionality to show/hide visited cities.
    document.getElementById("visitedCitiesBtn").addEventListener("click", function(){
        let visitedCitiesBox = document.getElementById("visitedCitiesBox");
        let button = document.getElementById("visitedCitiesBtn");

        if (visitedCitiesBox.style.display === "block") {
            visitedCitiesBox.style.display = "none";
            button.textContent = "Se besökta städer";
        } else {
            visitedCitiesBox.style.display = "block";
            showVisitedCities();
            button.textContent = "Göm besökta städer";
        }
    })

     //Added functionality to clear the visited cities list aka clearing localstorage.
    document.getElementById("clearHistory").addEventListener("click", function() {
        localStorage.removeItem("visitedCities");

        let clearHistoryMsg = document.getElementById("clearHistoryMsg");
        clearHistoryMsg.textContent = "Historiken är rensad!";
        clearHistoryMsg.style.display = "block";

        clearHistoryMsg.style.opacity = 1;
        setTimeout(function() {
            clearHistoryMsg.style.transition = "opacity 1s ease-out";
            clearHistoryMsg.style.opacity = 0;
        }, 3000);

        showVisitedCities();
});