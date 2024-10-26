import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import Loader from './Loader';
const AuthChecker = ({ children }: { children: any }) => {
  const [isAuth, setIsAuth] = useState(false);
  const router = useRouter();

  const checkAuth = async () => {
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || "{}").token : "";

    await axios({
      method: "post",
      url: process.env.NEXT_PUBLIC_SERVER+"/user/checkAuth",
      withCredentials: true,
      data: {
        accessToken: token
      },
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then((res) => {
      setIsAuth(() => true);
    }).catch((err) => {
      console.log(err);
      router.push("/login");
    });
  }

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div>
      {isAuth ? children : <Loader />}
    </div>
  );
};

export default AuthChecker;