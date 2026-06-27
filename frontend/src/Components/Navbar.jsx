import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = () => navigate("/login");
    const cartCount= useSelector((state) => state.cart.cartCount);
    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return(
        <nav className="sticky top-0 z-50 bg-gray-800 shadow-md">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-3 text-white no-underline">
                            <img className="h-12 w-12 rounded-full object-cover shadow-sm" src="Design.png" alt="Scarlet Rose logo" />
                            <span className="text-xl font-semibold tracking-[0.2em] uppercase text-white">
                                Scarlet Rose
                            </span>
                        </Link>
                        <div className="hidden md:block">
                            <div className="flex items-center space-x-4">
                                <Link to="/" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white">Home</Link>
                                <Link to="/shop" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white">Shop</Link>
                                <Link to="/about" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white">About</Link>
                                <Link to="/contact" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition hover:bg-gray-700 hover:text-white">Contact</Link>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link to="/cart" className="relative inline-flex items-center rounded-full border border-transparent bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.35 5.4a1 1 0 001 1.2h12.9a1 1 0 001-.78l1.3-5.8M16 21a1 1 0 100-2 1 1 0 000 2zm-8 0a1 1 0 100-2 1 1 0 000 2z" />
                            </svg>
                            <span className="sr-only">Cart</span>
                            <span className="absolute -right-2 -top-2 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white">
                                {cartCount}
                            </span>
                        </Link>

                        {user ? (
                            <>
                                <Link to="/profile" className="rounded-full border border-gray-600 bg-white px-3 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-100">
                                    Hi, {user.name}
                                </Link>
                                {user.role === "admin" && (
                                    <Link to="/admin" className="rounded-full bg-amber-500 px-3 py-2 text-sm font-medium text-black transition hover:bg-amber-700 ">
                                        Admin
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="rounded-full border border-transparent bg-rose-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-500">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link to="/login" onclick={handleLogin}  className="rounded-full bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700">
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar