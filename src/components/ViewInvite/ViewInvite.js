import React, { useState } from "react";
import EventDetails from "../EventDetails/EventDetails";
import "./ViewInvite.css";

const ViewInvite = (props) => {
    const [formData, setFormData] = useState({});
    const [event, setEvent] = useState({});
    const [inviteLoaded, setInviteLoaded] = useState(false);

    const handleFormData = (event) => {
        setFormData((form) => ({
            ...form,
            [event.target.name]: event.target.value,
        }));
    };

    async function handleInviteForm(event) {
        event.preventDefault();

        try {
            let res = await fetch(
                "https://simply-rsvp-backend.herokuapp.com/get_rsvp_invite",
                {
                    method: "POST",
                    body: JSON.stringify({ formData }),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (res.ok) {
                let data = await res.json();
                data["invited_email"] = formData["invited_email"];
                setEvent(data);
                setInviteLoaded(true);
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
            {!inviteLoaded && (
                <>
                    <h1 className="mt-14 md:mt-48 mb-8 md:mb-12 text-3xl md:text-4xl text-secondary">
                        View Invite
                    </h1>
                    <form
                        onChange={handleFormData}
                        onSubmit={handleInviteForm}
                        className="flex flex-col w-3/4 sm:w-1/2 lg:w-3/12"
                    >
                        <div className="relative border-b-2 border-primary mb-8 z-0 focus-within:border-secondary">
                            <input
                                type="email"
                                name="invited_email"
                                placeholder=""
                                className="block w-full appearance-none focus:outline-none focus:text-secondary bg-transparent"
                            ></input>
                            <label
                                htmlFor="invited_email"
                                className="absolute bottom-3 origin-0 -z-1 duration-300"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative border-b-2 border-primary mb-4 z-0 focus-within:border-secondary">
                            <input
                                type="number"
                                name="invite_code"
                                placeholder=""
                                className="block w-full appearance-none focus:outline-none focus:text-secondary bg-transparent"
                            ></input>
                            <label
                                htmlFor="invite_code"
                                className="absolute bottom-3 origin-0 -z-1 duration-300"
                            >
                                Invite Code
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

            <EventDetails
                display={inviteLoaded}
                displayError={props.displayError}
                header={"You have been invited!"}
                classes="flex flex-col items-center"
                invite={true}
                event={event}
            ></EventDetails>
        </>
    );
};

export default ViewInvite;
