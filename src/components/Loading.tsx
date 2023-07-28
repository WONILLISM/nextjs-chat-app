import Image from "next/image";
import loadingImg from "../../public/Loading.gif";

const Loading = () => (
  <div className="w-full h-full flex items-center justify-center">
    <Image src={loadingImg} alt="Loading ..." />
  </div>
);

export default Loading;
