/**
 * Imports
 */

import { useDispatch, useSelector } from 'react-redux';
import { setPage } from './features/pageSlice';
import navConfig from './configs/navConfig'; 
import Nav from './components/Nav/Nav'; 

/**
 * App
 */

const App = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((state) => state.page.currentPage);

    return (
        <div>
            <div>
                {navConfig.pages[currentPage]}
            </div>
            <Nav 
                navLinks={navConfig.navLinks} 
                displayPage={(page) => dispatch(setPage(page))}
                config={navConfig} 
            />
        </div>
    );
};

export default App;