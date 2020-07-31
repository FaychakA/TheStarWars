import React, {Dispatch, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {currentStarshipSelector, filmsSelector, peopleSelector, starshipsSelector} from "../../Redux/reducers";
import {useParams} from "react-router";
import {getIdFromUrl, getUrlFromId} from "../../helpers/getId";
import {Link} from "react-router-dom";
import {AllStarshipsActions, loadStarshipDetail} from "../../Redux/starShipsReducer";

const StarshipPage = () => {

    const films = useSelector(filmsSelector);
    const people = useSelector(peopleSelector);
    const currentStarship = useSelector(currentStarshipSelector);
    const dispatchStarships = useDispatch<Dispatch<AllStarshipsActions>>();
    const {starshipId} = useParams();
    const starships = useSelector(starshipsSelector);

    useEffect(() => {
        const shipUrl = getUrlFromId(starshipId, 'starships');

        const currentStarshipDetail = starships.data.results.find(starship => starship.url === shipUrl) || currentStarship;
        dispatchStarships(loadStarshipDetail(currentStarshipDetail));

    }, []);


    return (
        <section className="product-page">
            <h2 className="product-page__head">
                {currentStarship.name}
            </h2>

            <div className="product-page__item">
                {`Model: ${currentStarship.model}`}
            </div>

            <div className="product-page__item">
                {`Manufacturer: ${currentStarship.manufacturer}`}
            </div>

            <div className="product-page__item">
                {`Cost in credits: ${currentStarship.cost_in_credits}`}
            </div>

            <div className="product-page__item">
                {`Length: ${currentStarship.length}`}
            </div>

            <div className="product-page__item">
                {`Max atmosphering speed: ${currentStarship.max_atmosphering_speed}`}
            </div>

            <div className="product-page__item">
                {`Crew: ${currentStarship.crew}`}
            </div>

            <div className="product-page__item">
                {`Passengers: ${currentStarship.passengers}`}
            </div>

            <div className="product-page__item">
                {`Cargo capacity: ${currentStarship.cargo_capacity}`}
            </div>

            <div className="product-page__item">
                {`Consumables: ${currentStarship.consumables}`}
            </div>

            <div className="product-page__item">
                {`Hyperdrive rating: ${currentStarship.hyperdrive_rating}`}
            </div>

            <div className="product-page__item">
                {`MGLT: ${currentStarship.MGLT}`}
            </div>

            <div className="product-page__item">
                {`Starship class: ${currentStarship.starship_class}`}
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Films:
                    {currentStarship.films.map(film => {
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
                    {currentStarship.pilots.map(pilot => {
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
                {`Created: ${currentStarship.created}`}
            </div>

            <div className="product-page__item">
                {`Edited: ${currentStarship.edited}`}
            </div>
        </section>
    );
};

export default StarshipPage;
