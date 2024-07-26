  import { Input } from "../components";
  import { useForm } from "react-hook-form";
  // import { inputFields } from "../constant/constant";
  import registerImg from "../assets/register-img.png";
  import * as yup from "yup";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { userData } from "../data/atoms";
  import { useSetRecoilState } from "recoil";

  const Register = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    console.log(apiUrl);
    const [selected, setSelected] = useState(false);
    const [expertSelected, setExpertSelected] = useState(false);
    const navigate = useNavigate();
    const setUserData = useSetRecoilState(userData);

    const schema = yup.object().shape({
      name: yup
        .string()
        .min(4, "* Name must be at least 4 characters long")
        .max(32, "* Name cannot be more than 32 characters long")
        .required("* Name is required"),
      email: yup
        .string()
        .email("* Invalid email format")
        .required("* Email is required"),
      phoneNo: yup
        .string()
        .matches(/^[0-9]{10}$/, "* Phone number must be exactly 10 digits")
        .required("* Phone number is required"),
      cutOff: yup
        .number() 
        .nullable() // Allow null values
        .typeError("* Cut off is required") // Ensure it's a number
        .min(0, "* Cut off must be at least 0")
        .max(200, "* Cut off must be at most 200") // Updated message
        .required("* Cut off is required"),
      community: yup
        .string()
        .required("* Community is required"),
      expertPermission: yup
        .string() 
        .required("* Expert Permission is required")
    });

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      resolver: yupResolver(schema),  
    });
  
    const handleSelect = () => {
      setSelected(true);
    }

    const handleExpertSelect = () => {
      setExpertSelected(true);
    }

    const onSubmit = async (formData,e) => {
      setUserData(formData);
      const {name,email,phoneNo,cutOff,community, expertPermission} = formData;
      console.log(formData);
      e.preventDefault();
      const options = {
        method : 'POST',
        headers: {
          'Content-type': ' application/json'
        },
        body: JSON.stringify({
          name,email,phoneNo,cutOff,community,expertPermission
        })
      }
      const res = await fetch(
        'https://tnea-9a87e-default-rtdb.firebaseio.com/UserData.json',
        options
      )
      console.log(res);
      if(res){
        alert("message Sent");
      }
      else{
        alert("error");
      }
      navigate("/home");
    } 

    return (
      <div className="w-full h-screen flex">
        <div className="bg-blue-500 w-1/2 flex justify-center items-center">
          <div>
            <h2 className="text-2xl text-blue-50 font-bold text-center py-2">
              TNEA Choice List
            </h2>
            <h2 className="text-xl text-blue-100 font-semibold text-center">
              Make Your Own Choice List for Building Your Future
            </h2>
            <div className="flex justify-center">
              <img src={registerImg} alt="" className="w-[400px] h-auto" />
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          <div className="w-full">
            <h1 className="text-blue-400 text-2xl font-bold text-center">
              Enter Your Details
            </h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col max-w-96 mx-auto pt-7"
            >
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
              <Input {...register("name")} type="text" placeholder="Name" />

              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <Input
                {...register("email")}
                type="email"
                placeholder="Email ID"
              />

              {errors.phoneNo && (
                <p className="text-red-500">{errors.phoneNo.message}</p>
              )}
              <Input
                {...register("phoneNo")}
                type="tel"
                placeholder="Phone Number"
              />

              {errors.cutOff && (
                <p className="text-red-500">{errors.cutOff.message}</p>
              )}
              <Input
                {...register("cutOff")}
                step="any"
                type="number"
                placeholder="Cut-off Score"
              />

              {errors.community && (
                <p className="text-red-500">{errors.community.message}</p>
              )}
              <select
                {...register("community")}
                onClick={handleSelect}
                className={`bg-blue-100 font-semibold px-2 py-1.5 mb-2 rounded-md outline-none ${
                  selected ? "text-black" : "text-gray-400"
                }`}
              >
                <option value="">Community</option>
                <option value="oc">OC</option>
                <option value="bc">BC</option>
                <option value="bcm">BCM</option>
                <option value="mbc">MBC</option>
                <option value="sc">SC</option>
                <option value="sca">SCA</option>
                <option value="st">ST</option>
              </select>

              {errors.community && (
                <p className="text-red-500">
                  {errors.expertPermission.message}
                </p>
              )}
              <select
                {...register("expertPermission")}
                onClick={handleExpertSelect}
                className={`bg-blue-100 font-semibold px-2 py-1.5 rounded-md outline-none ${
                  expertSelected ? "text-black" : "text-gray-400"
                }`}
              >
                <option value="">Want to talk with Experts?</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>

              <button
                type="submit"
                className="block bg-blue-400 text-white font-semibold py-2 mt-3 rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
  export default Register;