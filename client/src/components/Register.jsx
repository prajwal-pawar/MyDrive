const Register = () => {
  return (
    <div className="lg:w-1/4 m-auto my-20 h-screen flex flex-col items-center md:w-1/2 sm:w-full">
      <h1 className="text-3xl my-5">Register</h1>

      <input
        type="text"
        className="w-full appearance-none border-2 rounded py-2 px-4 mb-3 focus:outline-none focus:border-blue-500"
        placeholder="Username"
      />
      <input
        type="password"
        className="w-full appearance-none border-2 rounded py-2 px-4 mb-3 focus:outline-none focus:border-blue-500"
        placeholder="Password"
      />
      <button className="w-1/2 shadow py-2 px-4 bg-blue-500 rounded text-white hover:bg-blue-400">
        Sign up
      </button>
    </div>
  );
};

export default Register;
