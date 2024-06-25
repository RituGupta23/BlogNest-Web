import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function TopLoadingLine() {
    const router = useRouter();
    const [loadingProgress, setloadingProgress] = useState(0);

    useEffect(() => {
        const handleStart = () => {
            setloadingProgress(80);
        }

        const handleComplate = () => {
            setloadingProgress(100);
            setTimeout(() => {
                setloadingProgress(0);
            }, 500);
        }



        // add event listeners for page loading
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplate', handleComplate);
        router.events.on('routeChangeError', handleComplate);

        // clean up event listeners
        return () => {
            router.events.off('routeChangeStart', handleStart);
            router.events.off('routeChangeComplate', handleComplate);
            router.events.off('routeChangeError', handleComplate);
        }

    }, [router.events])

    return <>
        <div className="topLoadingLine" style={{ width: `${loadingProgress}` }}></div>
    </>
}