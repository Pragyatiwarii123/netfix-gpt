import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";


const Header = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector((store) => store.user)

    const handleSignOut = () => {
        signOut(auth).then(() => {
            navigate('/')
        }).catch((error) => {
            navigate('/error')
        });
    }

    return (
        <div className="absolute bg-gradient-to-b w-screen from-black z-10 flex justify-between">
            <img className="w-148 h-40" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
                alt="logo" />
            {user && <div className="flex mt-8"> <img
                className="w-20 h-20"
                src={'https://ik.imagekit.io/fx/tr:n-ik_ml_thumbnail/clients/113/jobs/uploaded/pragya_Rqcw-JhhN1.png'}
                alt="user-logo"
            />
                <button className="mb-14 text-white font-bold" onClick={handleSignOut}>Sign Out</button>
            </div>}
        </div>
    )
}

export default Header;