import logo from '../../assets/img/Guardehub.svg'

const NavLogo = () => {
    return(
        <div className='nav-logo-container'>
            <img
                src={logo}
                alt='Logo.svg'
                width='100%'
                height='100%'
            />
        </div>
    )
}

const NavButton = ({text, onClickHandler}) => {
    return(
        <span onClick={onClickHandler}>
            {text}
        </span>
    )
}

export const Navbar = () => {
   /* const handleNavigateToTaskComplete = () =>{
        navigate('/complete')
    }*/

       /* const handleNavigateToTaskIncomplete = () =>{
        navigate('/Incomplete')
    }*/

    return(
        <div className='nav-container'>
            <NavLogo/>
            <div className='nav-buttons-container'>
                <NavButton text='home'/>
                <NavButton text='task complete' />
                <NavButton text='task incomplete'  />
            </div>
        </div>
    )
}