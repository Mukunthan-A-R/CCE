import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { expertDetails, userData } from "../data/atoms";

const SignUpPopup = ({ setExpert }) => {
  const [step, setStep] = useState(1); // step 1: login, step 2: cutoff+community
  const [expertData, setExpertData] = useState({ name: "", password: "" });
  const [data, setData] = useState({ cutOff: "", community: "", name: "" });
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const setExpertDetails = useSetRecoilState(expertDetails);
  const setUserDetails = useSetRecoilState(userData);

  const handleLogin = () => {
    if (expertData.name === "sit2024" && expertData.password === "tnea@2024") {
      setExpertDetails({
        email: expertData.name,
        password: expertData.password,
      });
      setStep(2); // go to cutoff/community step
    } else {
      setError(true);
    }
  };

  const handleFinalSubmit = () => {
    const { name, community, cutOff } = data;
    if (!name || !community || !cutOff) {
      alert("Please fill all the fields.");
      return;
    }
    setUserDetails({ name, community, cutOff });
    navigate("/home");
  };

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className="shadow-2xl overflow-y-auto overflow-x-hidden fixed flex z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Sign in as Expert
            </h3>
            <button
              type="button"
              onClick={() => setExpert(false)}
              className="end-2.5 text-gray-400 hover:text-gray-900 text-sm w-8 h-8"
            >
              ✕
            </button>
          </div>

          <div className="p-4 md:p-5">
            <form className="space-y-4">
              {step === 1 && (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your Expert Id
                    </label>
                    <input
                      type="email"
                      id="email"
                      onChange={(e) =>
                        setExpertData({ ...expertData, name: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      placeholder="name@company.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your password
                    </label>
                    <input
                      type="password"
                      id="password"
                      onChange={(e) =>
                        setExpertData({ ...expertData, password: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  {error && (
                    <p className="text-red-500 font-medium">
                      The Id or password is incorrect
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={handleLogin}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Login to your account
                  </button>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Expert Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={data.name}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Enter name"
                      className="w-full border p-2 rounded"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cutoff"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Cutoff Mark
                    </label>
                    <input
                      type="number"
                      id="cutoff"
                      value={data.cutOff}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, cutOff: e.target.value }))
                      }
                      placeholder="Enter cutoff"
                      className="w-full border p-2 rounded"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="community"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Community
                    </label>
                    <select
                      id="community"
                      value={data.community}
                      onChange={(e) =>
                        setData((prev) => ({ ...prev, community: e.target.value }))
                      }
                      className="w-full border p-2 rounded"
                    >
                      <option value="">Select community</option>
                      <option value="oc">OC</option>
                      <option value="bc">BC</option>
                      <option value="bcm">BCM</option>
                      <option value="mbc">MBC</option>
                      <option value="sc">SC</option>
                      <option value="sca">SCA</option>
                      <option value="st">ST</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                  >
                    Submit Expert Details
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPopup;
