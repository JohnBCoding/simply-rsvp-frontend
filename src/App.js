import NavBar from "./components/UI/NavBar";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import UpdateEvent from "./components/UpdateEvent/UpdateEvent";
import ViewInvite from "./components/ViewInvite/ViewInvite";
import ErrorPopup from "./components/UI/ErrorPopup";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import React, { useState } from "react";

function App() {
    const [error, setError] = useState(false);
    const [errorText, setErrorText] = useState("");

    const onDisplayError = (text) => {
        console.log(text);
        setError(true);
        setErrorText(text);

        // Set error timeout so popup closes
        setTimeout(() => {
            setError(false);
        }, 2500);
    };
    return (
        <div className="min-h-screen bg-background text-primary font-serif">
            <BrowserRouter>
                <NavBar />
                <hr className="border-b-1 border-info mt-4" />
                <main>
                    <section className="flex flex-col items-center">
                        <Switch>
                            <Route path="/update">
                                <UpdateEvent displayError={onDisplayError} />
                                <ErrorPopup
                                    display={error}
                                    error={errorText}
                                    classes="mt-2 border-b-2 text-warning text-sm"
                                ></ErrorPopup>
                            </Route>
                            <Route path="/view">
                                <ViewInvite displayError={onDisplayError} />
                                <ErrorPopup
                                    display={error}
                                    error={errorText}
                                    classes="mt-2 border-b-2 text-warning text-sm"
                                ></ErrorPopup>
                            </Route>
                            <Route path="/">
                                <CreateEvent displayError={onDisplayError} />
                                <ErrorPopup
                                    display={error}
                                    error={errorText}
                                    classes="mt-2 border-b-2 text-warning text-sm"
                                ></ErrorPopup>
                            </Route>
                        </Switch>
                    </section>
                </main>
            </BrowserRouter>
        </div>
    );
}

export default App;
