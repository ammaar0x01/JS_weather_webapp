/**
 * Contains functions used to make a request to the weather-API, and 
 * display the relevant information on the webpage
*/
class Weather{
    #key; 
    #dataset;
    #forecast_dataset;
    #forecast_city_data;
    #region; 

    constructor(){
        this.#key = "46edbc6bc8e1c754dc11b32edee0532da09"
        this.#dataset;  
        this.#forecast_dataset;
        this.#forecast_city_data;
        this.allIcons = {
            "01d": "../images/icons/clear.png",
            "01n": "../images/icons/clear.png",
            "02d": "../images/icons/cloud.png",
            "02n": "../images/icons/cloud.png",
            "03d": "../images/icons/cloud.png",
            "03n": "../images/icons/cloud.png",
            "04d": "../images/icons/drizzle.png",
            "04n": "../images/icons/drizzle.png",
            "09d": "../images/icons/rain.png",
            "09n": "../images/icons/rain.png",
            "10d": "../images/icons/rain.png",
            "10n": "../images/icons/rain.png",
            "13d": "../images/icons/snow.png",
            "13n": "../images/icons/snow.png",
        }
        this.#region; 
    }
    // ---------------------

    /**
     * An asynchronous function that sends a request to the weather-API
    */
    async search(){
        // Search by city name
        this.#region = document.getElementById("city-name-input").value 
        if (this.#region == ""){
            // const ipAPI = "https://ipapi.co/json/"
            // let responseIP = await fetch(ipAPI)
            // if (responseIP.status == 200){
            //     const data = await responseIP.json()
            //     this.#region = data["city"]
            // }
            // or 
            this.#region = "Cape Town"
        }
        console.log(this.#region)

        // Making request
        let baseURL = `https://api.openweathermap.org/data/2.5/forecast?q=${this.#region}&units=metric&appid=${this.#key.slice(0, 32)}`
        let response = await fetch(baseURL)
        if (response.status == 200){
            this.#dataset = await response.json()
            this.#forecast_dataset = this.#dataset["list"]
            this.#forecast_city_data = this.#dataset["city"]
        }
         
        // Displaying and adding data to HTML doc
        // --------------------------------------
        this.displayDataToday()
        this.displayDataforDays()
    }

    /**
     * Used to display weather-data for the current day
    */
    displayDataToday(){
        // city/region name
        document.getElementById("city-name").innerHTML = this.#region
        
        // other info
        const cardToday = document.querySelector("#card-today")
        // ~~~~~~~~~~~~~~~~~~~~
        const dataToday = this.#forecast_dataset[0]
        const d = new Date()
        const date = d.toUTCString().slice(0, 16)
        cardToday.querySelector(".date").innerHTML = date

        const iconCode = dataToday["weather"][0]["icon"] 
        cardToday.querySelector(".weather-icon").setAttribute("src", this.allIcons[iconCode])
       
        cardToday.querySelector(".weather-condition").innerHTML = dataToday["weather"][0]["description"] 
        cardToday.querySelector(".temperature").innerHTML = dataToday["main"]["temp"] + " °C"
        cardToday.querySelector(".max").innerHTML = "Maximum: " + dataToday["main"]["temp_max"] + " °C"
        cardToday.querySelector(".min").innerHTML = "Minimum: " +  dataToday["main"]["temp_min"] + " °C"
        cardToday.querySelector(".feels-like").innerHTML = "Feels like: " + dataToday["main"]["feels_like"] + " °C"
        cardToday.querySelector(".humidity").innerHTML = "Humidity: " + dataToday["main"]["humidity"] + " %"
        cardToday.querySelector(".wind-speed").innerHTML = "Wind-speed: " +  dataToday["wind"]["speed"] + " km/h"
        cardToday.querySelector(".pressure").innerHTML = "Pressure: " + dataToday["main"]["pressure"] + " mb"
        // ~~~~~~~~~~~~~~~~~~~~
    }

    /**
     * Used to display weather-data about the next 4 days
    */
    displayDataforDays(){
        let allDates = []
        let allDateIndices = []
        for (let a=0; a < this.#forecast_dataset.length; a++){
            let d = this.#forecast_dataset[a].dt_txt
            let date = d.slice(0, 10)
            if (!allDates.includes(date)){
                allDates.push(date)
                allDateIndices.push(a)
            }
        }

        const cards = document.querySelectorAll(".card-body")
        // ~~~~~~~~~~~~~~~~~~~~
        for (let a=1; a < cards.length; a++){
            let dayObj = this.#forecast_dataset[allDateIndices[a]]
            cards[a].querySelector(".date").innerHTML = allDates[a]

            let iconCode = dayObj["weather"][0]["icon"] 
            cards[a].querySelector(".weather-icon").setAttribute("src", this.allIcons[iconCode])
           
            cards[a].querySelector(".weather-condition").innerHTML = dayObj["weather"][0]["description"] 
            cards[a].querySelector(".temperature").innerHTML = dayObj["main"]["temp"] + " °C"
        }
        // ~~~~~~~~~~~~~~~~~~~~
    }
}
// ===============================

const objWeather = new Weather()

console.log("Getting data...")
objWeather.search()
// ===============================
