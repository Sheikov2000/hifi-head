import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ApplicationViews } from "../views/ApplicationViews";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("nick@nick.org");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "hifi_user",
            JSON.stringify({
              id: user.id,
              
            })
          );

          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return (
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Hi-Fi Head!</h1>
          <h3>User based audiophile track list</h3>
          <fieldset>
            <label htmlFor="inputEmail"> Please log in with email: </label>
            <input
              type="email"
              value={email}
              onChange={(evt) => set(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="buttons">
            <button type="submit" className="sign__button">Sign in</button>
            <Link to="/register"><button className="register__button">Not registered?</button></Link>
          </fieldset>
        </form>
      </section>
    </main>
  )
}


