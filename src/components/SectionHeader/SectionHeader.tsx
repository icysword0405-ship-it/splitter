import './SectionHeader.css'

const SectionHeader = () => {
    return (
        <div className='section-header'>
            <h2 className='section-header__title'> Your Groups </h2>
            <button 
                type='button'
                className='section-header__action'
            >
                View all
            </button>
        </div>
    )
}

export default SectionHeader;
