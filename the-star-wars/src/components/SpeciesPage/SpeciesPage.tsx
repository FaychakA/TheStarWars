import React, {Dispatch, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    currentSpeciesSelector,
    filmsSelector, kindsSelector, peopleSelector,
    planetsSelector,
} from "../../Redux/reducers";
import {useParams} from "react-router";
import {getIdFromUrl, getUrlFromId} from "../../helpers/getId";
import {Link} from "react-router-dom";
import {AllKindsActions, loadSpeciesDetail} from "../../Redux/speciesReducer";

const SpeciesPage = () => {
    const films = useSelector(filmsSelector);
    const people = useSelector(peopleSelector);
    const currentSpecies = useSelector(currentSpeciesSelector);
    const dispatchSpecies = useDispatch<Dispatch<AllKindsActions>>();
    const {speciesId} = useParams();
    const planets = useSelector(planetsSelector);
    const kinds = useSelector(kindsSelector);

    useEffect(() => {
        const speciesUrl = getUrlFromId(speciesId, 'species');

        const currentSpeciesDetail = kinds.data.results.find(species => species.url === speciesUrl) || currentSpecies;
        dispatchSpecies(loadSpeciesDetail(currentSpeciesDetail));

    }, []);


    return (
        <section className="product-page">
            <h2 className="product-page__head">
                {currentSpecies.name}
            </h2>

            <div className="product-page__item">
                {`Classification: ${currentSpecies.classification}`}
            </div>

            <div className="product-page__item">
                {`Designation: ${currentSpecies.designation}`}
            </div>

            <div className="product-page__item">
                {`Average height: ${currentSpecies.average_height}`}
            </div>

            <div className="product-page__item">
                {`Skin colors: ${currentSpecies.skin_colors}`}
            </div>

            <div className="product-page__item">
                {`Hair colors: ${currentSpecies.hair_colors}`}
            </div>

            <div className="product-page__item">
                {`Eye colors: ${currentSpecies.eye_colors}`}
            </div>

            <div className="product-page__item">
                {`Average lifespan: ${currentSpecies.average_lifespan}`}
            </div>

            <div className="product-page__item">
                {`language: ${currentSpecies.language}`}
            </div>

            <div className="product-page__item">
                Homworld:
                {function() {
                    const homeworld = planets.data.results.find(world => world.url === currentSpecies.homeworld);
                    return (
                        <Link to={`/planets/${getIdFromUrl(currentSpecies.homeworld)}`}
                              className="product-page__link"
                        >
                            {homeworld ? homeworld.name : ''}
                        </Link>
                    )
                }()}
            </div>

            <div className="product-page__item">
                <ul className="product-page__list">
                    Films:
                    {currentSpecies.films.map(film => {
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
                    People:
                    {currentSpecies.people.map(character => {
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
                {`Created: ${currentSpecies.created}`}
            </div>

            <div className="product-page__item">
                {`Edited: ${currentSpecies.edited}`}
            </div>
        </section>
    );
};

export default SpeciesPage;
