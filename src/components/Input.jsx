import { forwardRef } from "react";

const Input = forwardRef((props, ref) => {
  
  return (
    <input {...props} ref={ref}
      className="bg-blue-100 px-2 py-1.5 mb-2 rounded-md outline-none placeholder:text-blue-500" />
  )
});

export default Input;