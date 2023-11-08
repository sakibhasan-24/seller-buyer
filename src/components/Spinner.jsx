import spinner from "../assets/spinner.svg";

export default function Spinner() {
  return (
    <div className="flex justify-center items-center">
      <img src={spinner} alt="loader" className="h-24 " />
    </div>
  );
}
