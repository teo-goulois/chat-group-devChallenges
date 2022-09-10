import React from "react";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { getProviders, getCsrfToken, signIn } from "next-auth/react";
import { authOptions } from "./api/auth/[...nextauth]";
import { Provider } from "next-auth/providers";
import { LogosGoogleIcon, MdiGithub } from "../icons/Icons";

type Props = {
  providers: Provider;
  csrfToken: string | undefined;
};

const login = ({ providers, csrfToken }: Props) => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-500">
      <div className="max-w-[400px] ">
        <h2 className="font-semibold text-2xl text-primary py-2">Login</h2>
        <p className="text-secondary">
          Login to start posting and to get connected with People all over the
          world!
        </p>

        <form action="" className="grid grid-rows-1 gap-4 my-2">
          <div className="flex gap-4 items-center justify-center text-primary">
            <>
              {Object.values(providers).map((provider) => {
                return (
                  <div key={provider.name} className='shadow-xl hover:shadow-gray-700'>
                    <button
                      type="button"
                      className="bg-white rounded-lg px-4 py-2 m-2 "
                      onClick={() =>
                        signIn(provider.id, { callbackUrl: "/channels" })
                      }
                    >
                      {provider.name === "Google" ? (
                        <div className="h-12 mb-2">
                          {" "}
                          <LogosGoogleIcon />
                        </div>
                      ) : (
                        <div className="h-12 mb-2">
                          {" "}
                          <MdiGithub />
                        </div>
                      )}{" "}
                      {provider.name}
                    </button>
                  </div>
                );
              })}
            </>
          </div>
        </form>
      </div>
    </div>
  );
};

export default login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await unstable_getServerSession(
    ctx.req,
    ctx.res,
    authOptions
  );

  const providers = await getProviders();
  const csrfToken = await getCsrfToken(ctx);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  if (csrfToken) {
    return {
      props: { providers, csrfToken },
    };
  }
  return {
    props: { providers },
  };
};
