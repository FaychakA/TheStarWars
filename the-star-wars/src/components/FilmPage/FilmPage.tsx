import React, {Dispatch, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useParams} from "react-router";
import {
    currentFilmSelector,
    filmsSelector, kindsSelector,
    peopleSelector,
    planetsSelector, starshipsSelector, vehiclesSelector
} from "../../Redux/reducers";
import {Link} from "react-router-dom";
import {getIdFromUrl, getUrlFromId} from "../../helpers/getId";
import {AllFilmsActions, loadFilmDetail} from "../../Redux/filmsReducer";


const FilmPage = () => {

    const people = useSelector(peopleSelector);
    const planets = useSelector(planetsSelector);
    const starships = useSelector(starshipsSelector);
    const vehicles = useSelector(vehiclesSelector);
    const kinds = useSelector(kindsSelector);
    const currentFilm = useSelector(currentFilmSelector);
    const dispatchFilm = useDispatch<Dispatch<AllFilmsActions>>();
    const {filmId} = useParams();
    const films = useSelector(filmsSelector);

    useEffect(() => {
        const filmUrl = getUrlFromId(filmId, 'films');

        const currentFilmDetail = films.data.results.find(film => film.url === filmUrl) || currentFilm;
        dispatchFilm(loadFilmDetail(currentFilmDetail));

    }, []);


    return (
        <section className="product-page">
            <h2 className="product-page__head">
                {currentFilm.title}
            </h2>

            <div className="product-page__item">
                {`Episode: ${currentFilm.episode_id}`}
            </div>

            <div className="product-page__item">
                {`Opening crawl: ${currentFilm.opening_crawl}`}
            </div>

            <div className="product-page__item">
                {`Director: ${currentFilm.director}`}
            </div>

            <div className="product-page__item">
                {`Producer: ${currentFilm.producer}`}
            </div>

            <div className="product-page__item">
                {`Release date: ${currentFilm.release_date}`}
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Characters:
                    {currentFilm.characters.map(character => {
                        const human = people.data.results.find(human => human.url === character);

                        return (
                            <li key={character} className="product-page__element">
                                <Link to={`/people/${getIdFromUrl(character)}`}
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
                    Planets:
                    {currentFilm.planets.map(planet => {
                        const world = planets.data.results.find(world => world.url === planet);

                        return (
                            <li key={planet} className="product-page__element">
                                <Link to={`/planets/${getIdFromUrl(planet)}`}
                                      className="product-page__link"
                                >
                                    {world ? world.name : ''}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Starships:
                    {currentFilm.starships.map(starship => {
                        const ship = starships.data.results.find(ship => ship.url === starship);

                        return (
                            <li key={starship} className="product-page__element">
                                <Link to={`/starships/${getIdFromUrl(starship)}`}
                                      className="product-page__link"
                                >
                                    {ship ? ship.name : ''}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Vehicles:
                    {currentFilm.vehicles.map(vehicle => {
                        const transport = vehicles.data.results.find(transport => transport.url === vehicle);

                        return (
                            <li key={vehicle} className="product-page__element">
                                <Link to={`/vehicles/${getIdFromUrl(vehicle)}`}
                                      className="product-page__link"
                                >
                                    {transport ? transport.name : ''}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Species:
                    {currentFilm.species.map(species =>  {
                        const race = kinds.data.results.find(race => race.url === species);

                        return (
                            <li key={species} className="product-page__element">
                                <Link to={`/species/${getIdFromUrl(species)}`}
                                      className="product-page__link"
                                >
                                    {race ? race.name : ''}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className="product-page__item">
                {`Created: ${currentFilm.created}`}
            </div>

            <div className="product-page__item">
                {`Edited: ${currentFilm.edited}`}
            </div>
        </section>
    );
};

export default FilmPage;
