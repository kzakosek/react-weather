import '../Css/Weather.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup'
import { Col, Row, Form } from "react-bootstrap";

function Weather() {
    const [input, setInput] = useState('')
    const [name, setName] = useState('')
    const [weathers, setWeather] = useState([])
    const [condition, setCondition] = useState()
    const [icon, setIcon] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [searches, setSearches] = useState([])

    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + input + '&units=metric&appid=50edd61f4ff2018c56342ffa46223816'
    var iconUrl = 'http://openweathermap.org/img/wn/' + icon + '@4x.png'

    const handleClick = async () => {
        try {
            setName('');
            setLoading(true);
            setError(false);
            const response = await axios.get(url);
            if (response && response.data) {
                setSearches(searches => [input, ...searches].slice(0, 5));
                setWeather(response.data.main);
                setName(response.data.name);
                setCondition(response.data.weather[0].main);
                setIcon(response.data.weather[0].icon)
                setLoading(false);

            }
        } catch (err) {
            console.log(err.response.data);
            setError(true);
        }
    }

    useEffect(() => {
        //do when searches changes
        if (input.trim().length > 0) {
            var searchOptions = document.getElementById("dataList");
            if (searchOptions.options.length > 2) {
                searchOptions.children[0].remove()
            }
            searchOptions.innerHTML += '<option value="' + input + '"></option>';
        }
    }, [searches])

    return (
        <div >
            <div>
                <Form onSubmit={e => e.preventDefault()}>
                    <Row className="dlo-flex justify-content-center">
                        <Col sm={5} className="my-1">
                            <Form.Label visuallyHidden>
                                City
                            </Form.Label>
                            <InputGroup>
                                <InputGroup.Text>City</InputGroup.Text>
                                <input className="form-control" list="dataList" placeholder="City" onChange={(event) => setInput(event.target.value)} />
                                <datalist id="dataList"></datalist>
                            </InputGroup>
                        </Col>
                        <Col xs="auto" className="my-1">
                            <Button onClick={handleClick}>Get Weather</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <div>
                <h2>{name}</h2>
            </div>
            <div>
                {(() => {
                    if (loading) {
                        if (error) {
                            return (
                                <div className="alert alert-danger" role="alert"> Wrong city </div>
                            )
                        } else {
                            return (
                                <div className="alert alert-warning" role="alert">
                                    <div className="spinner-border text-warning" role="status">  </div>
                                </div>
                            )
                        }
                    } else {
                        return (
                            <div>
                                <div>
                                    <img src={iconUrl} alt="weather image" width="150" height="150" />{condition}
                                </div>
                                <table className="styled-table">
                                    <tbody className="content">
                                        <tr>
                                            <td>Current temperature</td>
                                            <td>Feels like</td>
                                            <td>Min temperature</td>
                                            <td>Max temperature</td>
                                            <td>Humidity</td>
                                        </tr>
                                        <tr>
                                            <td>{weathers.temp}°C</td>
                                            <td>{weathers.feels_like}°C</td>
                                            <td>{weathers.temp_min}°C</td>
                                            <td>{weathers.temp_max}°C</td>
                                            <td>{weathers.humidity}%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                })()}
            </div>
        </div>
    )
}

export default Weather
