import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

export default function Login() {

    const { data: session, status } = useSession();

    if (status === "loading") {
        return <div className="loadingdata flex flex-col flex-center wh_100">
            <Loading />
        </div>
    }

    const router = useRouter();

    async function login() {
        await router.push('/');
        await signIn();
    }

    if (session) {
        router.push('/');
        return null; // return null orr any loading indicator
    }

    // not session or not login then show this page for login
    if (!session) {
        return <>
            <div className="loginfront flex flex-center flex-col full-w">
                <Image src="/img/user.png" width={250} height={250} />
                <h1>Welcome Admin of the BlogNest</h1>
                <p>Visit to our main website</p>

                <button className="mt-2" onClick={login}>Login with Google</button>
            </div>
        </>
    }
}