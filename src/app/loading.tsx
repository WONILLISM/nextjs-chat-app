import Image from "next/image";
import loadingImg from "../../public/Loading.gif";

const Loading = () => (
  <div className="flex items-center justify-center w-full h-full">
    <Image src={loadingImg} alt="Loading ..." />
  </div>
);

export default Loading;
