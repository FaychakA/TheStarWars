/* tslint:disable */
/* eslint-disable */

import React, {Dispatch, useEffect} from 'react';
import HomePage from "./components/HomePage/HomePage";
import {Switch, Route} from "react-router";
import FilmPage from "./components/FilmPage/FilmPage";
import Header from "./components/Header/Header";
import './App.scss';
import PeoplePage from "./components/PeoplePage/PeoplePage";
import PlanetPage from "./components/PlanetPage/PlanetPage";
import StarshipPage from "./components/StarshipPage/StarshipPage";
import VehiclePage from "./components/VehiclePage/VehiclePage";
import SpeciesPage from "./components/SpeciesPage/SpeciesPage";
import {useDispatch, useSelector} from "react-redux";
import {
    filmsSelector,
    kindsSelector,
    peopleSelector,
    planetsSelector,
    starshipsSelector,
    vehiclesSelector
} from "./Redux/reducers";
import {AllPeopleActions, loadPeople, loadPeopleError, loadPeopleSuccess} from "./Redux/peopleReducer";
import {AllFilmsActions, loadFilms, loadFilmsError, loadFilmsSuccess} from "./Redux/filmsReducer";
import {AllPlanetsActions, loadPlanets, loadPlanetsError, loadPlanetsSuccess} from "./Redux/planetsReducer";
import {AllStarshipsActions, loadStarships, loadStarshipsError, loadStarshipsSuccess} from "./Redux/starShipsReducer";
import {AllVehiclesActions, loadVehicles, loadVehiclesError, loadVehiclesSuccess} from "./Redux/vehiclesReducer";
import {AllKindsActions, loadKinds, loadKindsError, loadKindsSuccess} from "./Redux/speciesReducer";
import {getFilms, getPeople, getPlanets, getSpecies, getStarships, getVehicles} from "./helpers/api";
import Spinner from "./components/Spinner/Spinner";


const App = () => {

    const people = useSelector(peopleSelector);
    const planets = useSelector(planetsSelector);
    const starships = useSelector(starshipsSelector);
    const vehicles = useSelector(vehiclesSelector);
    const kinds = useSelector(kindsSelector);
    const dispatchPeople = useDispatch<Dispatch<AllPeopleActions>>();
    const dispatchPlanets = useDispatch<Dispatch<AllPlanetsActions>>();
    const dispatchStarships = useDispatch<Dispatch<AllStarshipsActions>>();
    const dispatchVehicles = useDispatch<Dispatch<AllVehiclesActions>>();
    const dispatchKinds = useDispatch<Dispatch<AllKindsActions>>();
    const films = useSelector(filmsSelector);
    const dispatch = useDispatch<Dispatch<AllFilmsActions>>();

    useEffect(() => {

        if(!films.loaded) {
            dispatch(loadFilms());

            getFilms()
                .then(data => {
                    dispatch(loadFilmsSuccess(data))
                })
                .catch(error => dispatch(loadFilmsError(error)));
        }

        if (!people.loaded) {
            dispatchPeople(loadPeople());

            getPeople(null)
                .then(data => {
                    dispatchPeople(loadPeopleSuccess(data))
                })
                .catch(error => dispatchPeople(loadPeopleError(error)));
        }

        if (!planets.loaded) {
            dispatchPlanets(loadPlanets());

            getPlanets(null)
                .then(data => {
                    dispatchPlanets(loadPlanetsSuccess(data))
                })
                .catch(error => dispatchPlanets(loadPlanetsError(error)));
        }

        if (!starships.loaded) {
            dispatchStarships(loadStarships());

            getStarships(null)
                .then(data => {
                    dispatchStarships(loadStarshipsSuccess(data))
                })
                .catch(error => dispatchStarships(loadStarshipsError(error)));
        }

        if (!vehicles.loaded) {
            dispatchVehicles(loadVehicles());

            getVehicles(null)
                .then(data => {
                    dispatchVehicles(loadVehiclesSuccess(data))
                })
                .catch(error => dispatchVehicles(loadVehiclesError(error)));
        }

        if (!kinds.loaded) {
            dispatchKinds(loadKinds());

            getSpecies(null)
                .then(data => {
                    dispatchKinds(loadKindsSuccess(data))
                })
                .catch(error => dispatchKinds(loadKindsError(error)));
        }

    }, []);


    useEffect(() => {

        if (people.data.next) {

            getPeople(people.data.next)
                .then(data => {
                    dispatchPeople(loadPeopleSuccess(data))
                })
                .catch(error => dispatchPeople(loadPeopleError(error)));
        }

    }, [people]);

    useEffect(() => {

       if (planets.data.next) {

            getPlanets(planets.data.next)
                .then(data => {
                    dispatchPlanets(loadPlanetsSuccess(data))
                })
                .catch(error => dispatchPlanets(loadPlanetsError(error)));
        }


    }, [planets]);

    useEffect(() => {

        if (starships.data.next) {

            getStarships(starships.data.next)
                .then(data => {
                    dispatchStarships(loadStarshipsSuccess(data))
                })
                .catch(error => dispatchStarships(loadStarshipsError(error)));
        }


    }, [starships]);

    useEffect(() => {

        if (vehicles.data.next) {

            getVehicles(vehicles.data.next)
                .then(data => {
                    dispatchVehicles(loadVehiclesSuccess(data))
                })
                .catch(error => dispatchVehicles(loadVehiclesError(error)));
        }


    }, [vehicles]);

    useEffect(() => {

        if (kinds.data.next) {

            getSpecies(kinds.data.next)
                .then(data => {
                    dispatchKinds(loadKindsSuccess(data))
                })
                .catch(error => dispatchKinds(loadKindsError(error)));
        }


    }, [kinds]);

    if (people.loading || films.loading || planets.loading
        || starships.loading || vehicles.loading || kinds.loading) {
        return (
            <div>
                <Spinner/>
            </div>
        )
    }


    return (
        <div className="App">
            <Header />

            <Switch>
                <Route
                    path="/"
                    exact
                    component={HomePage}
                />

                <Route
                    path={"/films/:filmId"}
                    exact
                    component={FilmPage}
                />

                <Route
                    path={"/people/:peopleId"}
                    exact
                    component={PeoplePage}
                />

                <Route
                    path={"/planets/:planetId"}
                    exact
                    component={PlanetPage}
                />

                <Route
                    path={"/starships/:starshipId"}
                    exact
                    component={StarshipPage}
                />

                <Route
                    path={"/vehicles/:vehicleId"}
                    exact
                    component={VehiclePage}
                />

                <Route
                    path={"/species/:speciesId"}
                    exact
                    component={SpeciesPage}
                />

            </Switch>
        </div>
    );
};

export default App;
