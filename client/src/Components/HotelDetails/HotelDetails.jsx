import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const HotelDetails = () => {
	const [hotelDetails, setHotelDetails] = useState(null);
	const [error, setError] = useState(null);
	const { hotelId } = useParams();
	useEffect(() => {
		const fetchHotelDetails = async () => {
			try {
				console.log("Fetching hotel details for ID:", hotelId);
				const response = await axios({
					method: "GET",
					url: "https://booking-com15.p.rapidapi.com/api/v1/hotels/getDescriptionAndInfo",
					params: {
						hotel_id: hotelId,
						languagecode: "en-us",
					},
					headers: {
						"X-RapidAPI-Key":
							"67e6b85d33mshd5e8a69a6d26d50p140b38jsn02c7a8bf3e37",
						"X-RapidAPI-Host": "booking-com15.p.rapidapi.com",
					},
				});
				console.log("Response received:", response.data);
				if (response.data.status && response.data.data) {
					setHotelDetails(response.data.data);
				} else {
					setError("Failed to fetch hotel details");
					console.log("Error message from API:", response.data.message);
				}
			} catch (error) {
				console.error("Error fetching hotel details:", error);
				setError(error);
				console.log("Error details:", error.response);
			}
		};

		fetchHotelDetails();
	}, [hotelId]);

	if (error) {
		return <div>Error loading hotel details.</div>;
	}

	if (!hotelDetails) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<h1>{hotelDetails[0].description}</h1>
		</>
	);
};

export default HotelDetails;
