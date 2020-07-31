import React, {Dispatch, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    currentPeopleSelector,
    filmsSelector, kindsSelector,
    peopleSelector,
    planetsSelector,
    starshipsSelector, vehiclesSelector
} from "../../Redux/reducers";
import {useParams} from "react-router";
import {getIdFromUrl, getUrlFromId} from "../../helpers/getId";
import {Link} from "react-router-dom";
import {AllPeopleActions, loadPeopleDetail} from "../../Redux/peopleReducer";
import Spinner from "../Spinner/Spinner";

const PeoplePage = () => {
    const films = useSelector(filmsSelector);
    const starships = useSelector(starshipsSelector);
    const vehicles = useSelector(vehiclesSelector);
    const currentPeople = useSelector(currentPeopleSelector);
    const dispatchPeople = useDispatch<Dispatch<AllPeopleActions>>();
    const {peopleId} = useParams();
    const people = useSelector(peopleSelector);
    const planets = useSelector(planetsSelector);
    const kinds = useSelector(kindsSelector)

    useEffect(() => {
        const humanUrl = getUrlFromId(peopleId, 'people');

        const currentPeopleDetail = people.data.results.find(human => human.url === humanUrl) || currentPeople;
        dispatchPeople(loadPeopleDetail(currentPeopleDetail));

    }, []);

    if (people.loading || films.loading || planets.loading
        || starships.loading || vehicles.loading || kinds.loading) {
        return (
            <div>
                <Spinner/>
            </div>
        )
    }

    return (
        <section className="product-page">
            <h2 className="product-page__head">
                {currentPeople.name}
            </h2>

            <div className="product-page__item">
                {`Height: ${currentPeople.height}`}
            </div>

            <div className="product-page__item">
                {`Mass: ${currentPeople.mass}`}
            </div>

            <div className="product-page__item">
                {`Hair color: ${currentPeople.hair_color}`}
            </div>

            <div className="product-page__item">
                {`Skin color: ${currentPeople.skin_color}`}
            </div>

            <div className="product-page__item">
                {`Eye color: ${currentPeople.eye_color}`}
            </div>

            <div className="product-page__item">
                {`Birth year: ${currentPeople.birth_year}`}
            </div>

            <div className="product-page__item">
                {`Gender: ${currentPeople.gender}`}
            </div>

            <div className="product-page__item">
                {`Eye color: ${currentPeople.eye_color}`}
            </div>

            <div className="product-page__item">
                Homworld:
                {function() {
                    const homeworld = planets.data.results.find(world => world.url === currentPeople.homeworld);
                    return (
                        <Link to={`/planets/${getIdFromUrl(currentPeople.homeworld)}`}
                              className="product-page__link"
                        >
                            {homeworld ? ` ${homeworld.name}` : ''}
                        </Link>
                    )
                }()}
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Films:
                    {currentPeople.films.map(film => {
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
                    Starships:
                    {currentPeople.starships.map(starship => {
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
                    {currentPeople.vehicles.map(vehicle => {
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
                    {currentPeople.species.map(species =>  {
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
                {`Created: ${currentPeople.created}`}
            </div>

            <div className="product-page__item">
                {`Edited: ${currentPeople.edited}`}
            </div>
        </section>
    );
};

export default PeoplePage;
