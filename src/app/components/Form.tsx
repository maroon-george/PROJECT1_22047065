// import { ReactNode } from "react";

type Props = {
      children: React.ReactNode,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}


const Form = ({children, handleSubmit} : Props) => {
      return (
            <form  onSubmit={handleSubmit} className=" bg-white/50 p-8 m-6  flex flex-col gap-3 b shadow-2xl rounded-3xl">
                  {children}
            </form>
      )
}

export default Form;
// bg-amber-50