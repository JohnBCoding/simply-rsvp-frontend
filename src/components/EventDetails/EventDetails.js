import React, { useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./EventDetails.css";

const EventDetails = (props) => {
    const transitionDetailsRef = useRef(null);
    const [statusSet, setStatusSet] = useState(false);
    const [statusMsg, setStatusMsg] = useState("");

    async function handleInviteStatus(event) {
        event.preventDefault();

        try {
            let res = await fetch(
                "https://simply-rsvp-backend.herokuapp.com/update_invite_status",
                {
                    method: "POST",
                    body: JSON.stringify({
                        invite: {
                            event_id: props.event.id,
                            status: event.target.value,
                            invited_email: props.event.invited_email,
                        },
                    }),
                    headers: { "Content-Type": "application/json" },
                }
            );
            if (res.ok) {
                let data = await res.json();
                setStatusSet(true);
                setStatusMsg(data);
            }
        } catch (error) {
            props.displayError(
                "Network error, please try again in a few minutes."
            );
        }
    }

    return (
        <CSSTransition
            in={props.display}
            timeout={300}
            unmountOnExit
            nodeRef={transitionDetailsRef}
            classNames="details"
        >
            <div ref={transitionDetailsRef} className={props.classes}>
                <h2 className="mt-12 md:mt-48 mb-6 md:mb-12 text-3xl md:text-4xl text-secondary">
                    {props.header}
                </h2>
                <h3 className="text-2xl md:text-3xl">Event Details</h3>
                {props.event.id && (
                    <p className="mb-8 text-warning">Event #{props.event.id}</p>
                )}
                <div className="mb-6 text-center">
                    <h3 className="mb-1 text-1xl md:text-2xl">Organizer</h3>
                    <p className="text-secondary">{props.event.creator}</p>
                </div>
                <div className="mb-6 text-center">
                    <h3 className="mb-1 text-1xl md:text-2xl">Where</h3>
                    <p className="text-secondary">{props.event.location}</p>
                </div>
                <div className="mb-6 text-center">
                    <h3 className="mb-1 text-1xl md:text-2xl">When</h3>
                    <p className="text-secondary">
                        {props.event.date} at {props.event.time}
                    </p>
                </div>
                <div className="mb-6 text-center">
                    <h3 className="mb-1 text-1xl md:text-2xl">Details</h3>
                    <p className="text-secondary">{props.event.desc}</p>
                </div>

                {props.showInvited && (
                    <div className="mb-6 text-center">
                        <h3 className="mb-1 text-1xl md:text-2xl">
                            Invites Sent To
                        </h3>
                        <p className="text-secondary">
                            {props.event.invited_emails}
                        </p>
                    </div>
                )}

                {props.invite && !statusSet && (
                    <div className="self-stretch flex flex-col">
                        <button
                            value="accept"
                            onClick={handleInviteStatus}
                            className="border-4 border-primary p-2 my-2 hover:border-secondary hover:bg-warning duration-700"
                        >
                            Accept
                        </button>
                        <button
                            value="decline"
                            onClick={handleInviteStatus}
                            className="border-4 border-primary p-2 hover:border-secondary hover:bg-warning duration-700"
                        >
                            Decline
                        </button>
                    </div>
                )}

                {statusSet && (
                    <p className="text-xl text-warning">{statusMsg}</p>
                )}
            </div>
        </CSSTransition>
    );
};

export default EventDetails;
