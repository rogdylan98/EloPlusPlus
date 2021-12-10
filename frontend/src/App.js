import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import QuestionFeed from "./components/QuestionFeed";
import QuestionDetails from "./components/QuestionDetails"
import SplashPage from "./components/SplashPage"
function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
    <nav className="navBar">
      <h1 className="title">Elo++</h1>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </nav>
    <main>
      <div className="questionFeed">
      <Switch>
          <Route path="/question/:questionId">
            <QuestionDetails />
          </Route>
          <Route path="/questions">
            <QuestionFeed/>
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
      </Switch>
      </div>
    </main>
    </>
  );
}

export default App;
