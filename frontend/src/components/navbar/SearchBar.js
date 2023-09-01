"use client";
import "regenerator-runtime/runtime";
import { useState, useContext, useEffect, useRef, Fragment } from "react";
import { RiSearchLine } from "react-icons/ri";
import { FaMicrophone, FaTimes } from "react-icons/fa";
import { FiMic } from "react-icons/fi";
import { Transition } from "@headlessui/react";
import { HiX } from "react-icons/hi";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { SearchContext } from "@/context/SearchContext";
import Link from "next/link";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const search = useContext(SearchContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isAutosuggestVisible, setIsAutosuggestVisible] = useState(false);
  const [previousSuggestions, setPreviousSuggestions] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const debouncedFetchAutoSuggestions = debounce(
    search.fetchAutoSuggestions,
    2000
  );
  const {
    transcript,
    listening,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();
  const autosuggestRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        autosuggestRef.current &&
        !autosuggestRef.current.contains(event.target)
      ) {
        setIsAutosuggestVisible(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [autosuggestRef]);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleClear = () => {
    setSearchQuery("");
    setSuggestions([]);
    setIsAutosuggestVisible(false);
  };

  const handleAutoSuggest = () => {
    console.log(search);
    if (search && search.search) {
      if (searchQuery.trim().length < 3) {
        setIsLoadingSuggestions(true);
      }
      if (searchQuery.trim().length >= 3) {
        setIsLoadingSuggestions(false);
        const autosuggestions = search.search.posts.filter((post) => {
          const lowercaseTitle = post.title.toLowerCase();
          const searchWords = searchQuery.trim().toLowerCase().split(/\s+/);
          return searchWords.some((word) => lowercaseTitle.includes(word));
        });
        setSuggestions(autosuggestions);

        if (autosuggestions.length > 0) {
          setPreviousSuggestions(autosuggestions);
        }

        setSuggestions(
          autosuggestions.length > 0 ? autosuggestions : previousSuggestions
        );
        setIsAutosuggestVisible(true);
        debouncedFetchAutoSuggestions(searchQuery);
      } else {
        setSuggestions([]);
        setIsAutosuggestVisible(false);
      }
    } else {
      setSuggestions([]);
      setIsAutosuggestVisible(false);
    }
  };

  const handleChange = (event) => {
    const inputQuery = event.target.value;
    setSearchQuery(inputQuery);
    handleAutoSuggest(inputQuery);
  };

  useEffect(() => {
    if (finalTranscript) {
      setIsModalOpen(false);
      setSearchQuery(transcript);
      SpeechRecognition.stopListening();
      SpeechRecognition.abortListening();
      resetTranscript();
    }
    if (!listening) {
      setIsModalOpen(false);
      SpeechRecognition.stopListening();
      SpeechRecognition.abortListening();
      resetTranscript();
    }
  }, [
    finalTranscript,
    transcript,
    listening,
    resetTranscript,
    isMicrophoneAvailable,
  ]);

  return (
    <>
      <form
        className="flex items-center search_bar w-full"
        onSubmit={handleSubmit}
        name="search"
      >
        <label className="flex items-center pl-2 pr-2">
          <RiSearchLine className="text-gray-400" />
        </label>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleChange}
          onFocus={() => setIsAutosuggestVisible(true)}
          className="py-2 px-2 bg-transparent focus:outline-none focus:ring-0 flex-1 rounded-r-lg"
        />
        {searchQuery && (
          <button
            type="button"
            className="flex items-center pl-2 pr-2"
            onClick={handleClear}
          >
            <FaTimes className="text-gray-600" />
          </button>
        )}
        <button
          type="button"
          className="flex items-center pl-2 pr-2"
          onClick={() => {
            setIsModalOpen(true);
            SpeechRecognition.startListening();
            resetTranscript();
          }}
        >
          <FaMicrophone className="text-gray-600" />
        </button>
      </form>

      {isAutosuggestVisible && searchQuery !== "" && (
        <div
          ref={autosuggestRef}
          className="absolute mt-1 suggestion w-auto md:w-[500px] max-w-[700px] max-h-[200px] z-10 bg-dlmode rounded-b-lg border-t-0 border border-gray-300 shadow-2xl overflow-y-auto"
        >
          {isLoadingSuggestions ? (
            <>
              <p className="text-center">At least type 3 Word</p>
            </>
          ) : suggestions.length > 0 ? (
            suggestions.map((item, index) => (
              <Link
                key={index}
                href={`${item.slug}`}
                className="block p-2 hover:bg-gray-100 cursor-pointer hover:text-black"
                onClick={() => {
                  setSearchQuery(item.title || item.metaTitle);
                  setSuggestions([]);
                }}
              >
                {item.title || item.metaTitle}
              </Link>
            ))
          ) : (
            <p>No Result Found</p>
          )}
        </div>
      )}

      <Transition show={isModalOpen} as={Fragment}>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Transition.Child
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black opacity-50"></div>
          </Transition.Child>
          <Transition.Child
            enter="transition-all duration-300"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition-all duration-200"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <div className="bg-white rounded-lg p-8 max-h-[450px] w-[600px]">
              <div className="flex justify-between items-center mb-4">
                <h2>
                  Microphone:&nbsp;
                  {listening && isMicrophoneAvailable ? "on" : "off"}
                  {!isMicrophoneAvailable && <span> - Need Permission</span>}
                </h2>
                <div className="absolute top-0 right-0 mt-4 mr-4">
                  <button
                    type="button"
                    className="p-2 rounded-md hover:bg-gray-200"
                    onClick={() => {
                      setIsModalOpen(false);
                      SpeechRecognition.stopListening();
                    }}
                  >
                    <HiX className="text-gray-600" />
                  </button>
                </div>
              </div>
              {browserSupportsSpeechRecognition ? (
                <div className="flex items-center">
                  <textarea
                    placeholder="Speak Listening..."
                    className="w-full h-auto max-h-[600px] min-h-[200px] resize-none focus:outline-none"
                    value={transcript}
                    disabled
                  />
                  {listening && isMicrophoneAvailable && (
                    <div className="text-red-400">Listening...</div>
                  )}
                  {!isMicrophoneAvailable && (
                    <div className="text-red-400 text-center">
                      but permission off
                    </div>
                  )}
                  <div
                    className="rounded-full p-4 border border-purple-900 cursor-pointer"
                    onClick={() => {
                      setIsModalOpen(false);
                      SpeechRecognition.stopListening();
                    }}
                  >
                    <FiMic size={40} />
                  </div>
                </div>
              ) : (
                <p>
                  Your browser does not support speech recognition software!
                </p>
              )}
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </>
  );
};

export default SearchBar;
