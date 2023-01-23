import { HomeIcon,MessagesIcon,UserIcon,SearchIcon } from '../../Icons';
import userPicture from '../../../../assets/user.jpg';

export default function NavigationPhone() {
  return (
    <section className='fixed bottom-0 w-full p-3 lg:hidden'>
        <nav className='bg-shape p-2 rounded-lg'>
            <ul className='flex justify-between items-center'>
                <li>
                    <a href="/" className='phone-nav-item active'>
                        <HomeIcon/>
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="/" className='phone-nav-item'>
                        <MessagesIcon/>
                        <span>Messages</span>
                    </a>
                </li>
                <li>
                    <a href="/" className='phone-nav-item'>
                        <UserIcon/>
                        <span>Profile</span>
                    </a>
                </li>
                <li>
                    <a href="/" className='phone-nav-item'>
                        <SearchIcon/>
                        <span>Search</span>
                    </a>
                </li>
                <li>
                    <a href="/" className='flex flex-col justify-center items-center gap-1.5'>
                        <img className='w-11 h-11 rounded-3xl' src={userPicture} alt="User profile" />
                    </a>
                </li>
            </ul>
        </nav>
    </section>
  )
}
