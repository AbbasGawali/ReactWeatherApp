import React from 'react'
import { useEffect, useState } from 'react'
import { Search, WbSunny } from '@material-ui/icons'

import "./App.css"
const App = () => {

    const date = new Date();

    const day = (date.getDay());
    let today;
    switch (day) {
        case 1:
            today = "Monday";
            break;
        case 2:
            today = "Tuesday";
            break;
        case 3:
            today = "Wednesday";
            break;
        case 4:
            today = "Thursday";
            break;
        case 5:
            today = "Friday";
            break;
        case 6:
            today = "Saturday";
            break;
        case 7:
            today = "Sunday";
            break;
        default:
            today = "none";
            break;
    }

    const monthData = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthData[date.getMonth()];
    const year = date.getFullYear();
    const tday = date.getDate();

    const [time, setTime] = useState("00:00:00");

    const getCTime = () => {
        const tDate = new Date().toLocaleTimeString();
        setTime(tDate);
    }
    setInterval(getCTime, 1000);

    //////////////////////////////////////////////


    let [searchCity, setSearchCity] = useState("pune");
    const [cityData, setCityData] = useState();

    // let pdate = 
    useEffect(() => {
        const fetchData = async () => {
            try {

                const url = `http://api.weatherstack.com/current?access_key=77b9b99e8cd3d4d4698c001501fbb50d&query=${searchCity}`;
                const data = await fetch(url);
                const resJson = await data.json();
                if (resJson.success === false) {
                    alert("No data found Please Enter Different City");
                } else {

                    setCityData(resJson);

                }
            } catch (err) {
                console.log(err);
            }
        }

        fetchData();

    }, [searchCity])

    const [cityInput, setCityInput] = useState("");

    const handleSubmit = () => {
        setSearchCity(cityInput);
        setCityInput("");
    }


    return (
        <div className='container'>
            <div className="mainContainer">
                <div className="weatherInfo">
                    <div className="info1">
                        <div className="city">

                            <h3>{!cityData ? (<p>No Data</p>) : (cityData.location.name)}</h3>
                            <h4>{!cityData ? (<p>No Data</p>) : (cityData.location.country)}</h4>
                        </div>
                        <div className="cityTimeinfo">

                            <div className="cityData">
                                <div className="c1">

                                    <h3>{time}</h3>
                                    <p>{today} {tday} {month} {year}</p>
                                </div>
                                <div className="c2">
                                    {!cityData ? (<p>No Data</p>) : (cityData.current.temperature)}°C
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* /////////////////////////////////////////////////////////// */}
                    <div className="info2">
                        <div className="weatherLogo"><WbSunny className="svg_icons" /></div>
                        <div className="climate">{!cityData ? (<p>No Data</p>) : (cityData.current.weather_descriptions)}</div>
                        <div className="lineUp">
                            <div className="line"></div>
                        </div>
                        <div className="searchCity">

                            <input onChange={(e) => setCityInput(e.target.value)} value={cityInput} className='searchBar' type="text" placeholder='Search City Here' />
                            <button onClick={handleSubmit}><Search /></button>
                        </div>
                        {!cityData ? (<p>No Data Found</p>) : (
                            <>


                                <h3 className='citys'>{cityData.location.name}, {cityData.location.country}</h3>
                                <div className="details">
                                    <div className="intdet">
                                        <h3>Temperature</h3>
                                        <h3>{cityData.current.temperature}°C ({cityData.current.weather_descriptions}) </h3>
                                    </div>
                                    <div className="lineUp">
                                        <div className="line"></div>
                                    </div>
                                    <div className="intdet">
                                        <h3>Humidity</h3>
                                        <h3>{cityData.current.humidity}%</h3>
                                    </div>
                                    <div className="lineUp">
                                        <div className="line"></div>
                                    </div>
                                    <div className="intdet">
                                        <h3>Visibility</h3>
                                        <h3>{cityData.current.visibility} ml </h3>
                                    </div>
                                    <div className="lineUp">
                                        <div className="line"></div>
                                    </div>
                                    <div className="intdet">
                                        <h3>Wind Speed</h3>
                                        <h3>{cityData.current.wind_speed} km/h</h3>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <div className="footer">


                <p className=''>Download Source Code | Developed By Abbas Gawali.</p>
            </div>
        </div>
    )
}

export default App