import React, {Dispatch, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    currentVehicleSelector,
    filmsSelector,
    peopleSelector, vehiclesSelector,
} from "../../Redux/reducers";
import {useParams} from "react-router";
import {getIdFromUrl, getUrlFromId} from "../../helpers/getId";
import {Link} from "react-router-dom";
import {AllVehiclesActions, loadVehicleDetail} from "../../Redux/vehiclesReducer";

const VehiclePage = () => {
    const films = useSelector(filmsSelector);
    const currentVehicle = useSelector(currentVehicleSelector);
    const dispatchVehicles = useDispatch<Dispatch<AllVehiclesActions>>();
    const {vehicleId} = useParams();
    const people = useSelector(peopleSelector);
    const vehicles = useSelector(vehiclesSelector);

    useEffect(() => {
        const vehicleUrl = getUrlFromId(vehicleId, 'vehicles');

        const currenrVehicleDetail = vehicles.data.results.find(transport => transport.url === vehicleUrl) || currentVehicle;
        dispatchVehicles(loadVehicleDetail(currenrVehicleDetail));

    }, []);


    return (
        <section className="product-page">
            <h2 className="product-page__head">
                {currentVehicle.name}
            </h2>

            <div className="product-page__item">
                {`Model: ${currentVehicle.model}`}
            </div>

            <div className="product-page__item">
                {`Manufacturer: ${currentVehicle.manufacturer}`}
            </div>

            <div className="product-page__item">
                {`Cost in credits: ${currentVehicle.cost_in_credits}`}
            </div>

            <div className="product-page__item">
                {`Length: ${currentVehicle.length}`}
            </div>

            <div className="product-page__item">
                {`Max atmosphering speed: ${currentVehicle.max_atmosphering_speed}`}
            </div>

            <div className="product-page__item">
                {`Crew: ${currentVehicle.crew}`}
            </div>

            <div className="product-page__item">
                {`Passengers: ${currentVehicle.passengers}`}
            </div>

            <div className="product-page__item">
                {`Cargo capacity: ${currentVehicle.cargo_capacity}`}
            </div>

            <div className="product-page__item">
                {`Consumables: ${currentVehicle.consumables}`}
            </div>

            <div className="product-page__item">
                {`Starship class: ${currentVehicle.vehicle_class}`}
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Films:
                    {currentVehicle.films.map(film => {
                        const episode = films.data.results.find(movie => movie.url === film);
                        return (
                            <li key={film} className="product-page__element">
                                <Link to={`/films/${getIdFromUrl(film)}`}
                                      className="product-page__link"
                                >
                                    {episode ? episode.title : ''}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Pilots:
                    {currentVehicle.pilots.map(pilot => {
                        const human = people.data.results.find(human => human.url === pilot);

                        return (
                            <li key={pilot} className="product-page__element">
                                <Link to={`/people/${getIdFromUrl(pilot)}`}
                                      className="product-page__link"
                                >
                                    {human ? human.name : ''}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="product-page__item">
                {`Created: ${currentVehicle.created}`}
            </div>

            <div className="product-page__item">
                {`Edited: ${currentVehicle.edited}`}
            </div>
        </section>
    );
};

export default VehiclePage;
