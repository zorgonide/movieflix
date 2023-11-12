import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../Shared/js/user-context';
function Header() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

    const { dispatch } = useUser();
    const {
        state: { user },
    } = useUser();
    let navigate = useNavigate();
    return (
        <nav className='navbar navbar-expand-lg navbar-dark px-3'>
            <a
                className='navbar-brand logo d-none d-md-inline'
                onClick={() => navigate('/')}
            >
                <h1>MovieFlix</h1>
            </a>
            <button
                className='custom-toggler navbar-toggler'
                type='button'
                data-toggle='collapse'
                data-target='#navbarsExample09'
                aria-controls='navbarsExample09'
                aria-expanded={!isNavCollapsed ? true : false}
                aria-label='Toggle navigation'
                onClick={handleNavCollapse}
            >
                <span className='navbar-toggler-icon'></span>
            </button>
            {user.role === 'USER' ? (
                <div
                    className={`${
                        isNavCollapsed ? 'collapse' : ''
                    } navbar-collapse`}
                    id='navbarNav'
                >
                    <ul className='navbar-nav'>
                        <li className='nav-item active'>
                            <Link
                                to='/'
                                className='nav-link'
                                onClick={() => navigate('/')}
                            >
                                Home
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/top-rated' className='nav-link'>
                                Top Rated
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/recommended' className='nav-link'>
                                Recommended
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/profile' className='nav-link'>
                                Profile
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to='/watchlist' className='nav-link'>
                                Watchlist
                            </Link>
                        </li>
                    </ul>
                </div>
            ) : null}
            <div className='col logout'>
                <form
                    className='form-inline'
                    onSubmit={(event) => {
                        event.preventDefault();
                        navigate(`/search?q=${searchTerm}`);
                    }}
                >
                    <input
                        className='search-bar'
                        type='text'
                        placeholder='Search'
                        id='search-bar'
                        aria-label='Search'
                        onChange={(event) => setSearchTerm(event.target.value)}
                    />
                </form>
                <Link
                    to=''
                    className='nav-link'
                    onClick={() => dispatch({ type: 'logout' })}
                >
                    <i className='fa fa-sign-out'></i>{' '}
                    <span className='d-none d-md-inline'>Log Out</span>
                </Link>
            </div>
        </nav>
    );
}

export default Header;
