import { useDispatch } from "react-redux";

export const InputComponent = (props) => {
  const dispatch = useDispatch();
  return (
    <div className="space-y-3">
      <label className="text-lg lg:text-2xl ml-1">{props.label}</label>
      <input
        className="w-full text-base px-4 py-2 text-black focus:text-base border border-gray-400 rounded-lg focus:outline-none focus:border-custom-yellow"
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={(e) => dispatch(props.dispatch(e.target.value))}
      />
    </div>
  );
};
