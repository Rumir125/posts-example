import "./style.css";

export default function ErrorScreen({
  message = "Something went wrong",
}: {
  message?: string;
}) {
  return (
    <div className="Error__wrapper">
      <h1>{message}</h1>
    </div>
  );
}
