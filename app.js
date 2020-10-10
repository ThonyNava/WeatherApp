window.onload = function () {
  let srcBar = document.getElementById("searchInput");
  let city = srcBar.value;
  let btn = document.getElementById("btn");
  let num = 1;

  btn.addEventListener("click", function () {
    city = srcBar.value.trim().toLowerCase();
    console.log(city);

    let api = "https://api.weatherbit.io/v2.0/current";
    let key = "5afb00c6b21a4729bcb428568839cea8";
    let url = `${api}?city=${city}&key=${key}`;

    // https://api.weatherbit.io/v2.0/current?city=Raleigh,NC&key=API_KEY

    console.log(url);
    fetch(url)
      .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw new Error(
            `Encountered something unexpected: ${response.status} ${response.statusText}`
          );
        }
      })
      .then((jsonResponse) => {
        let info = jsonResponse.data[0];
        let cityName = info.city_name;
        let icon = `https://www.weatherbit.io/static/img/icons/${info.weather.icon}.png`;
        let appTemp = `${info.app_temp}°`;
        let weather = info.weather.description;
        let time = info.ob_time;
        let lon = info.lon;
        let lat = info.lat;
        let map = `
          <div id='map${num}' style='width: 100%; height: 300px;'></div>`;
        let renderMap = () => {
          mapboxgl.accessToken =
            "pk.eyJ1IjoidGhvbnluYXZhIiwiYSI6ImNrZzNsdWRhNDBidWMycHBhcTR1eGZyaTQifQ.okegKOUAoGX1DEegYhbFiQ";
          var map = new mapboxgl.Map({
            container: `map${num}`,
            style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
            center: [lon, lat], // starting position [lng, lat]
            zoom: 9, // starting zoom
          });
          num++;
        };
        let structure = `<div class="card mt-4" style="width: 18rem;">
          ${map}
          <div class="card-body">
            <h5 class="card-title">${cityName}</h5>
            <img src="${icon}" alt="icon" class="img-thumbnail mx-auto border-0">
            <p class="card-text">${appTemp}</p>
            <p class="card-text">${weather}</p>
            <p class="card-text">${time}</p>
          </div>
        </div>`;

        let div = document.createElement("div");
        let mapsBox = document.getElementById("mapsBox");

        div.innerHTML = structure;
        mapsBox.appendChild(div);
        renderMap();

        var reSizing = setInterval(reZise, 1);
        let i = 0;

        function reZise() {
          let secHei = parseInt(
            document.getElementById("mapsSection").style.height
          );
          if (secHei < 670) {
            // console.log(secHei);
            // console.log(i);
            document.getElementById("mapsSection").style.height = `${i}px`;
            i += 20;
          } else {
            document.getElementById("mapsSection").style.height = "fit-content";
            myStopFunction();
          }
        }

        function myStopFunction() {
          clearInterval(reSizing);
        }

        document.getElementById("searchInput").value = "";
      })
      .catch((error) => {
        // Handle the error
        console.log(error);
        document.getElementById("searchInput").value = `Ups! Try again...`;
      });
  });
};

// let response = {
//   data: [
//     {
//       rh: 93,
//       pod: "d",
//       lon: 2.15899,
//       pres: 1013.5,
//       timezone: "Europe/Madrid",
//       ob_time: "2020-10-10 10:25",
//       country_code: "ES",
//       clouds: 100,
//       ts: 1602325500,
//       solar_rad: 59.5,
//       state_code: "56",
//       city_name: "Barcelona",
//       wind_spd: 0.5,
//       wind_cdir_full: "north",
//       wind_cdir: "N",
//       slp: 1022,
//       vis: 1.5,
//       h_angle: -15,
//       sunset: "17:18",
//       dni: 835.03,
//       dewpt: 19.9,
//       snow: 0,
//       uv: 3.02148,
//       precip: 3.78947,
//       wind_dir: 356,
//       sunrise: "05:58",
//       ghi: 595.28,
//       dhi: 102.71,
//       aqi: 48,
//       lat: 41.38879,
//       weather: { icon: "r01d", code: 500, description: "Light rain" },
//       datetime: "2020-10-10:10",
//       temp: 21.1,
//       station: "AT618",
//       elev_angle: 36.71,
//       app_temp: 21.7,
//     },
//   ],
//   count: 1,
// };
