import React from 'react'

const Signup = () => {
    return (
        <div className="App">
            <h2 className="App">Signup</h2>
            <form className="form">
                <input type="text" name="username" placeholder="username" />
                <input type="email" name="email" placeholder="Email Address" />
                <input type="password" name="password" placeholder="Password" />
                <input type="password" name="passwordConfirmation" placeholder="Confirm Password" />
            </form>

            <button type="submit" className="button-primary">Submit</button>
        </div>
    )
}

export default Signup;