import React, { useState } from "react";
import axios from "axios";

const HomeScreen = () => {
  //   const [city, setCity] = useState("");
  const [ip, setIp] = useState();
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const header = {
    "X-Api-Key": "X4e3pjUrUbjg1QqWzGIeTw==o21cSWFtdu6hy3vi",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ip);
    setisLoading(true);

    // Perform validation
    if (!ip.trim()) {
      setError("ip is required.");
      setisLoading(false);
      return;
    }

    // You can now send the data to the API here
    axios
      .get(`https://api.api-ninjas.com/v1/iplookup?address=${ip}`, {
        headers: header,
      })
      .then((response) => {
        console.log(response);
        if (response.data) {
          console.log(response.data.city);
          setData(response.data);
          setError("");
        } else {
          setError("Please enter a valid ip.");
        }
      })
      .catch((err) => {
        setError(
          "An error occurred while fetching data. Please try again later."
        );
      })
      .finally(() => {
        setisLoading(false);
      });

    // Reset the form
    setIp("");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <form
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            IP
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="Enter city name"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>

      {data && (
        <div className="bg-white shadow-md rounded-lg max-w-sm p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
          <div className="text-lg font-bold mb-4">Data Details</div>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <div className="text-gray-700">Address:</div>
              <div className="font-bold text-black">{data.address}</div>
            </div>
            <div>
              <div className="text-gray-700">City:</div>
              <div className="font-bold text-black">{data.city}</div>
            </div>
            <div>
              <div className="text-gray-700">Country:</div>
              <div className="font-bold text-black">{data.country}</div>
            </div>
            <div>
              <div className="text-gray-700">Country Code:</div>
              <div className="font-bold text-black">{data.country_code}</div>
            </div>
            <div>
              <div className="text-gray-700">Is Valid:</div>
              <div className="font-bold text-black">{data.is_valid.toString()}</div>
            </div>
            <div>
              <div className="text-gray-700">ISP:</div>
              <div className="font-bold text-black">{data.isp}</div>
            </div>
            <div>
              <div className="text-gray-700">Latitude:</div>
              <div className="font-bold text-black">{data.lat}</div>
            </div>
            <div>
              <div className="text-gray-700">Longitude:</div>
              <div className="font-bold text-black">{data.lon}</div>
            </div>
            <div>
              <div className="text-gray-700">Region:</div>
              <div className="font-bold text-black">{data.region}</div>
            </div>
            <div>
              <div className="text-gray-700">Region Code:</div>
              <div className="font-bold text-black">{data.region_code}</div>
            </div>
            <div>
              <div className="text-gray-700">Timezone:</div>
              <div className="font-bold text-black">{data.timezone}</div>
            </div>
            <div>
              <div className="text-gray-700">Zip:</div>
              <div className="font-bold text-black">{data.zip}</div>
            </div>
          </div>
        </div>
      )}
      {data == null && (
        <div className="bg-white shadow-md rounded-lg p-8 w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3">
          <div>
            <div className="text-gray-700">Please enter a valid IP</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
