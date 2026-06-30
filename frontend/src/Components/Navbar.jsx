import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { useSelector } from "react-redux";
import { PLACEHOLDER_IMAGE } from "../config/assets";

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate("/login");
    }
    const handleLogin = () => navigate("/login");
    const cartCount= useSelector((state) => state.cart.cartCount);

    return(
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 shadow-lg shadow-slate-950/10 backdrop-blur">
            <div className="w-full px-3 sm:px-6 lg:px-8">
                <div className="flex min-h-16 flex-wrap items-center justify-between gap-3 py-2">
                    <div className="flex min-w-0 items-center gap-4 lg:gap-6">
                        <Link to="/" className="flex min-w-0 items-center gap-3 text-white no-underline">
                            <img className="h-11 w-11 shrink-0 rounded-full object-cover shadow-md ring-1 ring-white/30 sm:h-12 sm:w-12" src={PLACEHOLDER_IMAGE} alt="Scarlet Rose logo" />
                            <span className="max-w-[150px] truncate text-base font-semibold uppercase tracking-[0.16em] text-white sm:max-w-none sm:text-xl">
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

                    <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
                        <Link to="/cart" className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-transparent bg-white text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-100 sm:h-11 sm:w-11">
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
                                <button onClick={handleLogout} className="rounded-full border border-transparent bg-rose-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-600">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={handleLogin}  className="rounded-full bg-emerald-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:px-4">
                                    Login
                                </Link>
                                <Link to="/register" className="rounded-full bg-rose-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 sm:px-4">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar
