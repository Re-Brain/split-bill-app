import { Text } from './Text'

interface SectionTitleProps {
  text: string;
}

export const SectionTitle = ({ text }: SectionTitleProps) => {
  return (
    <div className='bg-gradient-primary p-2 sm:p-3 lg:p-4 m-2 sm:m-3 lg:m-4 rounded-xl shadow-md'>
      <Text text={text} className="text-base sm:text-lg lg:text-xl text-white font-bold"/>
    </div>
  )
}