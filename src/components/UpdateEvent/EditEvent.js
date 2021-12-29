import React, { useState } from "react";
import EventDetails from "../EventDetails/EventDetails.js";

const EditEvent = (props) => {
    const [formSent, setFormSent] = useState(false);
    const [formData, setFormData] = useState({
        event_id: props.eventData.id,
        creator_fn: props.eventData.creator_fn,
        creator_ln: props.eventData.creator_ln,
        creator_email: props.eventData.creator_email,
        event_location: props.eventData.location,
        event_date: new Date(props.eventData.date)
            .toISOString()
            .substring(0, 10),
        event_time: props.eventData.time,
        event_desc: props.eventData.desc,
        event_invites: props.eventData.invited_emails,
    });
    const [event, setEvent] = useState({});

    const handleFormData = (event) => {
        setFormData((form) => ({
            ...form,
            [event.target.name]: event.target.value,
        }));
    };

    async function handleEditEventForm(event) {
        event.preventDefault();

        try {
            let res = await fetch(
                "https://simply-rsvp-backend.herokuapp.com/update_rsvp",
                {
                    method: "POST",
                    body: JSON.stringify({ formData }),
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (res.ok) {
                let data = await res.json();
                setFormSent(true);
                setEvent(data);
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
            {!formSent && (
                <>
                    <h1 className="mt-14 md:mt-48 mb-8 md:mb-12 text-3xl md:text-4xl text-secondary">
                        Edit Event
                    </h1>
                    <form
                        onChange={handleFormData}
                        onSubmit={handleEditEventForm}
                        className="flex flex-col w-3/4 sm:w-1/2 lg:w-3/12"
                    >
                        <div className="relative border-b-2 border-primary mb-8 z-0 focus-within:border-secondary">
                            <input
                                type="text"
                                name="creator_fn"
                                placeholder=""
                                className="block w-full appearance-none focus:outline-none focus:text-secondary bg-transparent"
                                defaultValue={formData.creator_fn}
                                required
                            ></input>
                            <label
                                htmlFor="creator_fn"
                                className="absolute bottom-3 origin-0 -z-1 duration-300"
                            >
                                First Name
                            </label>
                        </div>
                        <div className="relative border-b-2 border-primary mb-8 z-0 focus-within:border-secondary">
                            <input
                                type="text"
                                name="creator_ln"
                                placeholder=""
                                className="block w-full appearance-none focus:outline-none focus:text-secondary bg-transparent"
                                defaultValue={formData.creator_ln}
                                required
                            ></input>
                            <label
                                htmlFor="creator_ln"
                                className="absolute bottom-3 origin-0 -z-1 duration-300"
                            >
                                Last Name
                            </label>
                        </div>
                        <div className="relative border-b-2 border-primary mb-8 z-0 focus-within:border-secondary">
                            <input
                                type="email"
                                name="creator_email"
                                placeholder=""
                                className="block w-full appearance-none focus:outline-none focus:text-secondary bg-transparent"
                                defaultValue={formData.creator_email}
                                required
                            ></input>
                            <label
                                htmlFor="creator_email"
                                className="absolute bottom-3 origin-0 -z-1 duration-300"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative border-b-2 border-primary mb-8 z-0 focus-within:border-secondary">
                            <input
                                type="text"
                                name="event_location"
                                placeholder=""
                                className="block w-full appearance-none focus:outline-none focus:text-secondary bg-transparent"
                                defaultValue={formData.event_location}
                                required
                            ></input>
                            <label
                                htmlFor="event_location"
                                className="absolute bottom-3 origin-0 -z-1 duration-300"
                            >
                                Event Location
                            </label>
                        </div>
                        <div className="relative border-b-2 border-primary mt-2 z-0 focus-within:border-secondary">
                            <input
                                type="date"
                                name="event_date"
                                className="inline-block appearance-none focus:outline-none focus:text-secondary bg-transparent"
                                defaultValue={formData.event_date}
                                required
                            ></input>
                            <input
                                type="time"
                                name="event_time"
                                className="inline-block appearance-none focus:outline-none focus:text-secondary bg-transparent"
                                defaultValue={formData.event_time}
                                required
                            ></input>
                            <label
                                htmlFor="event_date"
                                className="block absolute bottom-3 origin-0 -z-1 duration-300"
                            >
                                Event Date
                            </label>
                        </div>
                        <div className="relative border-b-2 border-primary z-0 focus-within:border-secondary">
                            <textarea
                                name="event_desc"
                                placeholder="Event description"
                                className="resize-none block placeholder-info w-full h-6 mt-10 appearance-none bg-transparent hover:h-8 focus:outline-none focus:text-secondary focus:h-24 duration-300"
                                defaultValue={formData.event_desc}
                                required
                            ></textarea>
                            <label
                                htmlFor="event_desc"
                                className="absolute top-3 origin-0 -z-1 duration-300"
                            >
                                Description
                            </label>
                        </div>
                        <div className="relative border-b-2 border-primary z-0 focus-within:border-secondary">
                            <textarea
                                name="event_invites"
                                placeholder="Add emails seperated by a comma"
                                className="resize-none block placeholder-info w-full h-6 mt-10 appearance-none bg-transparent hover:h-8 focus:outline-none focus:text-secondary focus:h-24 duration-300"
                                defaultValue={formData.event_invites}
                                required
                            ></textarea>
                            <label
                                htmlFor="event_invites"
                                className="absolute top-3 origin-0 -z-1 duration-300"
                            >
                                Send To
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="border-4 border-primary p-2 m-4 hover:border-secondary hover:bg-warning duration-700"
                        >
                            Update
                        </button>
                    </form>
                </>
            )}

            <EventDetails
                display={formSent}
                header={"Event updated!"}
                classes="flex flex-col items-center"
                event={event}
                showInvited={true}
            ></EventDetails>
        </>
    );
};

export default EditEvent;
