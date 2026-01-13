interface SectionTitleProps {
    text : string;
}

export const SectionTitle = ({ text}: SectionTitleProps) => {
  return <h1 className='p-2 m-2 bg-blue-500 text-white text-xl font-bold'>{text}</h1>;
};