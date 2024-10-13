import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


const Login = () => {
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [isSignUp, setIsSignUp] = useState(true)
    const [errorMessage, setErrormessage] = useState(null)
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleSubmit = () => {
        const message = checkValidData(email.current.value, password.current.value)
        setErrormessage(message)
        if (message) return;

        if (isSignUp) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: "https://ik.imagekit.io/fx/tr:n-ik_ml_thumbnail/clients/113/jobs/uploaded/pragya_Rqcw-JhhN1.png"
                    }).then(() => {
                        const { uid, email, displayName, photoURL } = auth.currentUser
                        dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }))
                        navigate('/browse')
                    }).catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setErrormessage(errorCode + '-' + errorMessage)
                    });

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrormessage(errorCode + '-' + errorMessage)
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                    navigate('/browse')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrormessage(errorCode + '-' + errorMessage)
                });

        }

    }
    return (
        <div>
            <Header />
            <div className="absolute"><img
                src="https://assets.nflxext.com/ffe/siteui/vlv3/f272782d-cf96-4988-a675-6db2afd165e0/web/IN-en-20241008-TRIFECTA-perspective_b28b640f-cee0-426b-ac3a-7c000d3b41b7_small.jpg"
                alt="bg-img"
            />
            </div>
            <form onSubmit={(e) => e.preventDefault()} className="w-3/12 bg-black absolute py-12 px-10 my-40 mx-auto left-0 right-0 text-white bg-opacity-80">
                <h1 className="font-bold text-3xl ">{isSignUp ? 'Sign Up' : 'Sign In'}</h1>
                {isSignUp && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4  w-full bg-gray-800" />}
                <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4  w-full bg-gray-800" />
                <div className="relative">
                    <input
                        ref={password}
                        type={isPasswordVisible ? 'text' : 'password'}
                        placeholder="Password"
                        className="p-4 my-4 w-full bg-gray-800"
                    />
                    <button
                        type="button"
                        className="absolute right-0 top-1/2 p-4 transform -translate-y-1/2 text-sm text-gray-400"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                        {isPasswordVisible ? 'Hide' : 'Show'}
                    </button>
                </div>
                <p className="p-4 text-red-600 font-bold">{errorMessage ? errorMessage : ''}</p>
                <button className="p-4 my-4 w-full bg-red-600 rounded-md" onClick={(e) => handleSubmit()}>{isSignUp ? 'Sign Up' : 'Sign In'}</button>
                <p className="p-4 my-4">
                    {isSignUp ? (
                        <>
                            Already an user. <b className="cursor-pointer" onClick={() => setIsSignUp(false)}>Sign In</b>
                        </>
                    ) : (
                        <>
                            New to Netflix? <b className="cursor-pointer" onClick={() => setIsSignUp(true)}>Sign up now.</b>
                        </>
                    )}
                </p>

            </form>

        </div>

    )
}

export default Login;