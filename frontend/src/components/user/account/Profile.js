"use client";
import { BiUserCircle } from "react-icons/bi";
import { UserContext } from "@/context/UserContext";
import { useContext, useState, useEffect, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { axiosInstance } from "@/config/axiosConfig";
import toast, { Toaster } from "react-hot-toast";

const ProfilePage = () => {
  const [state, setState] = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (state && state.user) {
      console.log(state.user);
      setUsername(state.user.username);
      setName(state.user.name);
      setEmail(state.user.email);
    }
  }, [state, state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(`/profile-update`, {
        username,
        name,
        email,
      });
      console.log(data);
      if (data.error) {
        toast.error(data.error);
      } else {
        //update context
        setState({ ...state, user: data });
      }
    } catch (err) {
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <>
      <div className="w-full max-w-[36rem] mx-auto p-8 mt-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Profile Details</h1>
          <button
            onClick={openModal}
            className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <BiUserCircle size={60} />
          <div>
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-gray-600">{email}</p>
          </div>
        </div>
        <div className="mt-8">
          <div className="w-full lg:w-4/5 flex items-center justify-between mb-3">
            <span className="text-gray-500 font-semibold">Username</span>
            <div className="w-3/5">
              <span className="font-semibold">{username}</span>
            </div>
          </div>
        </div>
      </div>
      <Transition show={isModalOpen}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur-sm" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <label className="block text-gray-600">Name</label>
                    <div className="w-full md:w-10/12 lg:w-9/12">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-2 w-full border rounded focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <label className="block text-gray-600">Email</label>
                    <div className="w-full md:w-10/12 lg:w-9/12">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <label className="block text-gray-600">Gender</label>
                    <div className="w-full md:w-10/12 lg:w-9/12">
                      <div className="flex space-x-4">
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="male"
                            checked={gender === "male"}
                            onChange={(e) => setGender(e.target.value)}
                            className="mr-1"
                          />
                          Male
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === "female"}
                            onChange={(e) => setGender(e.target.value)}
                            className="mr-1"
                          />
                          Female
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mr-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <Toaster />
    </>
  );
};
export default ProfilePage;
