interface TextProps {
    text : string;
    className : string;
}

export const Text = ({ text, className }: TextProps) => {
  return <h1 className={className}>{text}</h1>;
};