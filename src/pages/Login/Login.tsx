// add styled component

//
// add form component !!!!!!!!!!!!!!
//

const Login = () => {
  return (
    <main>
      <form>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" />
        </div>
        <button>Login</button>
      </form>
    </main>
  );
};

export default Login;
