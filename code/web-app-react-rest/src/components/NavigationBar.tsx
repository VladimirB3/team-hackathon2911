import { Bars3Icon } from "@heroicons/react/24/outline";
import React from "react";

interface UserProps {
  user_info: Record<string, any>;
  logout: () => void;
}

const NavigationBar: React.FC<UserProps> = ({ user_info, logout }) => {
  return (
      <div className="bg-white top-10 text-gray-700">
        <header className="absolute inset-x-0 top-0 z-0">
          <nav
              aria-label="Global"
              className="flex items-center justify-between p-6 lg:px-8"
          >
            <div className="flex lg:flex-1">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                    alt=""
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                    className="h-8 w-auto"
                />
              </a>
              <div>Welcome: {user_info.name.givenName}</div>
            </div>

            <button
                onClick={logout} // Trigger logout function on click
                className="text-sm/6 font-semibold text-gray-900"
            >
              Log Out <span aria-hidden="true">&rarr;</span>
            </button>

            <div className="flex lg:hidden">
              <button
                  type="button"
                  className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>
            </div>
          </nav>
        </header>

        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:py-28">
              <div className="hidden sm:mb-8 sm:flex sm:justify-center"></div>
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            ></div>
          </div>
        </div>
      </div>
  );
};

export default NavigationBar;
