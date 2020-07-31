import React, {Dispatch, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filmsSelector, peopleSelector} from "../../Redux/reducers";
import {useParams} from "react-router";
import {getIdFromUrl, getUrlFromId} from "../../helpers/getId";
import {Link} from "react-router-dom";
import {currentPlanetSelector, planetsSelector} from "../../Redux/reducers";
import {AllPlanetsActions, loadPlanetDetail} from "../../Redux/planetsReducer";

const PlanetPage = () => {
    const films = useSelector(filmsSelector);
    const currentPlanet = useSelector(currentPlanetSelector);
    const dispatchPlanets = useDispatch<Dispatch<AllPlanetsActions>>();
    const {planetId} = useParams();
    const planets = useSelector(planetsSelector);
    const people = useSelector(peopleSelector);

    useEffect(() => {
        const humanUrl = getUrlFromId(planetId, 'planets');

        const currentPeopleDetail = planets.data.results.find(human => human.url === humanUrl) || currentPlanet;
        dispatchPlanets(loadPlanetDetail(currentPeopleDetail));

    }, []);

    return (
        <section className="product-page">
            <h2 className="product-page__head">
                {currentPlanet.name}
            </h2>

            <div className="product-page__item">
                {`Rotation period: ${currentPlanet.rotation_period}`}
            </div>

            <div className="product-page__item">
                {`Orbital period: ${currentPlanet.orbital_period}`}
            </div>

            <div className="product-page__item">
                {`Diameter: ${currentPlanet.diameter}`}
            </div>

            <div className="product-page__item">
                {`Climate: ${currentPlanet.climate}`}
            </div>

            <div className="product-page__item">
                {`Gravity: ${currentPlanet.gravity}`}
            </div>

            <div className="product-page__item">
                {`Terrain: ${currentPlanet.terrain}`}
            </div>

            <div className="product-page__item">
                {`Surface water: ${currentPlanet.surface_water}`}
            </div>

            <div className="product-page__item">
                {`Population: ${currentPlanet.population}`}
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Residents:
                    {currentPlanet.residents.map(resident => {
                        const human = people.data.results.find(human => human.url === resident);
                        return (
                            <li key={resident} className="product-page__element">
                                <Link to={`/people/${getIdFromUrl(resident)}`}
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
                <ul className="product-page__list">
                    Films:
                    {currentPlanet.films.map(film => {
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
                {`Created: ${currentPlanet.created}`}
            </div>

            <div className="product-page__item">
                {`Edited: ${currentPlanet.edited}`}
            </div>
        </section>
    );
};

export default PlanetPage;
