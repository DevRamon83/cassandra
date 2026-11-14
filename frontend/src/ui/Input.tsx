interface Props {
  htmlFor: string;
  label: string;
  type: string;
}

export default function Input({ htmlFor, label, type }: Props) {
  return (
    <>
      <label htmlFor={htmlFor}>{label}</label>
      <input type={type} id={htmlFor} name={htmlFor} required />
    </>
  );
}
