function addMuscle(muscleDetails, exercises) {
  const muscleContainer = document.createElement("div");
  muscleContainer.classList.add("muscle");

  const muscleName = document.createElement("h2");
  muscleName.innerText = `${muscleDetails.name} (${muscleDetails.name_en})`;

  const muscleImg = document.createElement("img");
  muscleImg.src = "https://wger.de" + muscleDetails.image_url_main;

  const exercisesContainer = document.createElement("div");
  exercisesContainer.classList.add("exercises");

  muscleContainer.append(muscleName, muscleImg, exercisesContainer);

  for (let exercise of exercises) {
    const exerciseContainer = document.createElement("div");
    exerciseContainer.classList.add("exercise");

    const exerciseName = document.createElement("p");
    exerciseName.innerText = exercise.name;

    const exerciseDescription = document.createElement("p");
    exerciseDescription.innerHTML = exercise.description;

    exerciseContainer.append(exerciseName, exerciseDescription);
    exercisesContainer.appendChild(exerciseContainer);
  }

  document.querySelector("#muscle").append(muscleContainer);
}

fetch("https://wger.de/api/v2/muscle/")
  .then((response) => response.json())
  .then((muscleData) => {
    console.log(muscleData);

    const fetchPromises = muscleData.results.map((muscle) => {
      return fetch(
        `https://wger.de/api/v2/exercise/?muscles=${muscle.id}&limit=3&offset=2&language=2`
      )
        .then((response) => response.json())
        .then((exerciseData) => ({
          muscle: muscle,
          exercises: exerciseData.results,
        }))
        .catch((err) => {
          console.error(err);
          return {
            muscle: muscle,
            exercises: [],
          };
        });
    });

    return Promise.all(fetchPromises);
  })
  .then((results) => {
    for (let result of results) {
      addMuscle(result.muscle, result.exercises);
    }
  })
  .catch((err) => {
    console.error(err);
  });




  function displayWeather(weatherData) {
    const temperature = weatherData.data[0].temp;
    const description = weatherData.data[0].weather.description;

    const weatherContainer = document.createElement("div");
    weatherContainer.classList.add("weather");

    const temperatureElement = document.createElement("p");
    temperatureElement.innerText = `Temperature: ${temperature}°C`;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerText = `Weather: ${description}`;

    weatherContainer.append(temperatureElement, descriptionElement);
    document.querySelector("#weather").append(weatherContainer);
}

fetch("https://api.weatherbit.io/v2.0/current?lat=40.7128&lon=-74.0060&key=bec9bbc393aa46b49a7646502656583c&units=M&lang=en&include=minutely")
    .then((response) => response.json())
    .then((weatherData) => {
        console.log(weatherData);
        displayWeather(weatherData);
    })
    .catch((err) => {
        console.error(err);
    });

