import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import supabase from "../utilities/supabase";
import sideImage from "../assets/girl-shopping-for-purse-on-ecommerce-app-8020158-6437464.png";

const LoginPage = () => {
  return (
    <section className="flex md:mx-8 lg:mx-0 flex-row w-full h-dvh">
      <div className="w-1/2 hidden md:flex h-full justify-center items-center">
        <img src={sideImage} alt="" />
      </div>
      <div className="w-full md:w-1/2 h-full flex justify-center items-center">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={["discord", "github", "google"]}
        />
      </div>
    </section>
  );
};

export default LoginPage;
