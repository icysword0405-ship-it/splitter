import {Bell, Menu} from 'lucide-react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <button 
                type='button'
                className='header-button'
                area-label='Open Menu'
            >
                <Menu size={24} />
            </button>
            <div className='header-logo'> Splitter </div>
            <button 
                type='button'
                className='header-button'
                area-label='Notification'
            >
                <Bell size={22} />
            </button>
        </header>

    )
}

export default Header;