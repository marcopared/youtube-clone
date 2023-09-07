'use client'

import { Fragment } from "react";
import { signInWithGoogle, signOut } from "../firebase/firebase";
import styles from "./sign-in.module.css";
import { User } from "firebase/auth";

interface SignInProps {
    user: User | null;
}

export default function SignIn({ user }: SignInProps) {
  return (
    <Fragment>
        { user ?
            (
                <button onClick={signOut} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Sign Out
                </button>
            ) : (
                <button onClick={signInWithGoogle} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Sign In
                </button>
            )
        }
    </Fragment>
  )
}
