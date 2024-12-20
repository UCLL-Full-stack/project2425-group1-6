import Image from "next/image"
import styles from "@styles/home.module.css"
import Header from "@/components/header"
import Head from "next/head"
import { UserLogIn, UserSignUp } from "@/types"
import { use, useState } from "react"
import Link from "next/link"
import router from "next/router"


const Signup: React.FC = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const user: UserSignUp = {
            name,
            email,
            phoneNumber,
            password,
            confirmPassword

        };
        console.log(user);
        router.push("/vehicles")
    };

    return (
        <>
            <Head>
                <title>Vehicle</title>
                <meta name="description" content="Vehicle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="bg-gradient-to-r from-white to-gray-300 flex items-center justify-center min-h-screen">
                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                    <h2 className="text-3xl font-bold mb-7">Sign Up</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-4">
                            <label className="flex text-sm font-medium">Name</label>
                            <input
                                className="w-full px-4 mt-2 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                type="text"
                                placeholder="Full Name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="flex text-sm font-medium">Email</label>
                            <input
                                className="w-full px-4 mt-2 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                type="email"
                                placeholder="Enter your Email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="flex text-sm font-medium">Phone Number</label>
                            <input
                                className="w-full px-4 mt-2 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                type="tel"
                                placeholder="Enter your Phone Number"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                value={phoneNumber}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="flex text-sm font-medium">Password</label>
                            <input
                                className="w-full px-4 mt-2 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="flex text-sm font-medium">Confirm Password</label>
                            <input
                                className="w-full px-4 mt-2 py-2 border rounded-md hover:border-[#2C2C34] focus:border-[#2C2C34] focus:outline-none transition duration-300"
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword}
                                required
                            />
                        </div>

                        <div className="flex items-center mt-2">
                            <input
                                id="show-password"
                                type="checkbox"
                                className="w-4 h-4"
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                            <label htmlFor="show-password" className="ml-2 text-sm">
                                Show Password
                            </label>
                        </div>

                        <div
                            className="flex mt-7 justify-center gap-3">
                            <Link
                                href="/"
                                className="flex items-center px-4 py-2 text-lg font-medium text-black drop-shadow-lg align-middle rounded-lg transition duration-500 bg-gray-200 text-gray-700 rounded hover:bg-gray-300  "
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="flex items-center px-4 py-2 text-lg font-normal text-black bg-[#FCBA04] hover:bg-[#FDCD49] drop-shadow-lg align-middle rounded-lg transition duration-500"
                            >
                                Sign Up
                            </button>

                        </div>

                    </form>

                    <Link
                        href="/login"
                        className="flex justify-center mt-4 hover:underline hover:decoration-black transition duration-300"

                    >
                        Already got an account?
                    </Link>

                </div>

            </main>
        </>
    );
}

export default Signup