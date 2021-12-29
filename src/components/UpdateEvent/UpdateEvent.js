import React, { useState } from "react";
import EditEvent from "./EditEvent";

const UpdateEvent = (props) => {
    const [formData, setFormData] = useState({});
    const [eventLoaded, setEventLoaded] = useState(false);
    const [eventData, setEventData] = useState({});

    const handleFormData = (event) => {
        setFormData((form) => ({
            ...form,
            [event.target.name]: event.target.value,
        }));
    };

    async function handleEventForm(event) {
        event.preventDefault();

        try {
            let res = await fetch(
                "https://simply-rsvp-backend.herokuapp.com/get_rsvp_event",
                {
                    method: "POST",
                    body: JSON.stringify({ formData }),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.ok) {
                let data = await res.json();
                setEventData(data);
                setEventLoaded(true);
            } else {
                props.displayError(await res.text());
            }
        } catch (error) {
            props.displayError(
                "Network error, please try again in a few minutes."
            );
        }
    }

    return (
        <>
            {!eventLoaded && (
                <>
                    <h1 className="mt-14 md:mt-48 mb-8 md:mb-12 text-3xl md:text-4xl text-secondary">
                        Lookup Event
                    </h1>
                    <form
                        onChange={handleFormData}
                        onSubmit={handleEventForm}
                        className="flex flex-col w-3/4 sm:w-1/2 lg:w-3/12"
                    >
                        <div className="relative border-b-2 border-primary mb-8 z-0 focus-within:border-secondary">
                            <input
                                type="email"
                                name="creator_email"
                                placeholder=""
                                className="block w-full appearance-none focus:outline-none focus:text-secondary bg-transparent"
                            ></input>
                            <label
                                htmlFor="creator_email"
                                className="absolute bottom-3 origin-0 -z-1 duration-300"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative border-b-2 border-primary mb-4 z-0 focus-within:border-secondary">
                            <input
                                type="number"
                                name="event_id"
                                placeholder=""
                                className="block w-full appearance-none focus:outline-none focus:text-secondary bg-transparent"
                            ></input>
                            <label
                                htmlFor="event_id"
                                className="absolute bottom-3 origin-0 -z-1 duration-300"
                            >
                                Event ID
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="border-4 border-primary p-2 m-4 hover:border-secondary hover:bg-warning duration-700"
                        >
                            Load
                        </button>
                    </form>
                </>
            )}

            {eventLoaded && (
                <EditEvent
                    eventData={eventData}
                    displayError={props.displayError}
                />
            )}
        </>
    );
};

export default UpdateEvent;
