import './SectionHeader.css'

interface SectionHeaderProps {
    title: string;
    action?: string;
    onAction?: () => void
}

const SectionHeader = ({title, action, onAction}: SectionHeaderProps) => {
    return (
        <div className='section-header'>
            <h2 className='section-header__title'> {title}</h2>
            {action && <button 
                type='button'
                className='section-header__action'
                onClick={onAction}
            >
                {action}
            </button> }
        </div>
    )
}

export default SectionHeader;
