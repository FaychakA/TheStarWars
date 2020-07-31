import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {NavLink, useHistory, useLocation} from "react-router-dom";
import debounce from 'lodash.debounce';
import './Films.scss';

type Props = {
    data: Data;
}

const Films: React.FC<Props> = ({data}) => {
    const films = data.results;
    const [query, setQuery] = useState('');
    const location = useLocation();
    const history = useHistory();

    const searchParams = new URLSearchParams(location.search);
    const lowerQuery = (searchParams.get('query') || '').toLowerCase();

    useEffect(() => {
        setQuery(lowerQuery);
    }, [lowerQuery]);

    const applyQuery = useCallback(
        debounce((queryDebounce: string) => {
            if (queryDebounce) {
                searchParams.set('query', queryDebounce);
            } else {
                searchParams.delete('query');
            }

            history.push({ search: searchParams.toString() });
        }, 500),
        [],
    );

    const visibleFilms = useMemo(
        () => films.filter(({ title }) => (title)
            .toLowerCase().includes(lowerQuery)),
        [lowerQuery, films],
    );

    let prepareFilms: Array<Film> = visibleFilms;

    useEffect(() => {

            if(searchParams.get('sortByName') === 'Z-A' || searchParams.get('sortByName') === null){
                prepareFilms = visibleFilms.sort((a, b) => a.title.localeCompare(b.title))
            } else if(searchParams.get('sortByName') === 'A-Z'){
                prepareFilms = visibleFilms.reverse();
            }
    },[location.search]);

    return (
        <section className="films">
            <input
                type="text"
                value={query}
                onChange={({ target }) => {
                    setQuery(target.value);
                    applyQuery(target.value);
                }}
                className="films__input"
            />

            <button
                type="button"
                onClick={() => {
                    if (searchParams.get('sortByName') === 'A-Z'){
                        searchParams.set('sortByName', 'Z-A');
                    } else {
                        searchParams.set('sortByName', 'A-Z');
                    }

                    history.push({
                        search: searchParams.toString(),
                    });
                }}
                className="films__button"
            >
              Sort by name
            </button>

            <ul className="films__list">
                {prepareFilms.map(film => (
                    <li key={film.episode_id} className="films__item">
                        <NavLink to={`/films/${film.id}`} exact className="films__link">
                            {film.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </section>
    )
};

export default Films;
